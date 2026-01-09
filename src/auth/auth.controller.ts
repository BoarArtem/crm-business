import { Controller, Res, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Регистрация',
    description: 'Позволяет пользователю зарегестрироваться',
  })
  @ApiConflictResponse({ description: 'Такой пользователь уже найден' })
  @ApiCreatedResponse({
    description: 'Пользователь успешно зарегестрирован / отдаётся accessToken',
  })
  @ApiBody({ type: RegisterDto })
  @Post('/register')
  create(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterDto) {
    return this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Логин',
    description: 'Позволяет пользователя зарегестрироваться',
  })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiOkResponse({
    description:
      'Пользователь успешно заходит в систему / отдаётся accessToken и refreshToken в куки',
  })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    return this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Рефреш токена',
    description: 'Позволяет заменить старый токен на новый',
  })
  @ApiUnauthorizedResponse({ description: 'Отсутствует refresh токен в куки' })
  @ApiNotFoundResponse({ description: 'Такой пользователь не найден' })
  @ApiOkResponse({ description: 'Отдаёт новый refresh токен' })
  @Post('/refresh')
  refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.refresh(res, req);
  }

  @ApiOperation({
    summary: 'Логаут',
    description: 'Позволяет пользователю выйти со своего аккаунта',
  })
  @ApiOkResponse({ description: 'Пользователь успешно вышел с аккаунта' })
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
