import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';
import { StringValue } from 'ms';
import { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  async register(res: Response, dto: RegisterDto) {
    const { firstName, lastName, email, password } = dto;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new ConflictException('Пользователь уже существует');
    }

    const user = await this.prismaService.user.create({
      data: {
        firstName,
        lastName,
        email,
        businessQuantity: 0,
        password: await hash(password),
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Такой пользователь не найден');
    }

    const validUserPassword = await verify(user.password, password);

    if (!validUserPassword) {
      throw new NotFoundException('Такой пользователь не найден');
    }

    return this.auth(res, user.id);
  }

  async refresh(res: Response, req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Недействительный refresh token');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Такой пользователь не найден');
      }

      return this.auth(res, user.id);
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));

    return 'Пользователь успешно вышел с аккаунта';
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateToken(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }

  private generateToken(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL as StringValue,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL as StringValue,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: 'localhost',
      expires,
      sameSite: 'lax',
      secure: false,
    });
  }
}
