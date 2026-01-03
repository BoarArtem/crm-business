import { Controller, Res, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterDto) {
    return this.authService.register(res, dto);
  }

  @Post('/login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    return this.authService.login(res, dto);
  }

  @Post('/refresh')
  refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.refresh(res, req);
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
