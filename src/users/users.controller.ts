import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Изменения информации аккаунта пользователя',
    description: 'Позволяет пользователю изменить firstname и lastname',
  })
  @ApiOkResponse({ description: 'Успешно измененный пользователь' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('access-token')
  @Patch()
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() dto: UpdateUserDto, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.usersService.updateUser(dto, userId);
  }

  @ApiOperation({
    summary: 'Удаление аккаунта пользователя',
    description: 'Позволеяет пользователю удалить свой аккаунт',
  })
  @ApiOkResponse({ description: 'Успешно удалён аккаунт' })
  @ApiBearerAuth('access-token')
  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.usersService.deleteUser(userId);
  }
}
