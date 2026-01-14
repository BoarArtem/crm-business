/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Req,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @ApiOperation({
    summary: 'Создание бизнеса',
    description: 'Позволяет пользователю создать бизнес',
  })
  @ApiBody({ type: CreateBusinessDto })
  @ApiConflictResponse({ description: 'Такой бизнес уже существует' })
  @ApiCreatedResponse({ description: 'Бизнес успешно создан' })
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(JwtAuthGuard)
  createBusiness(@Body() dto: CreateBusinessDto, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const directorId = req.user.id;

    return this.businessService.createBusiness(dto, directorId);
  }

  @ApiOperation({
    summary: 'Получение всех бизнесов пользователя',
    description: 'Позволяет получить все бизнесы которые имеет пользователь',
  })
  @ApiNotFoundResponse({ description: 'Ничего не найдено' })
  @ApiOkResponse({ description: 'Массив всех бизнесов' })
  @ApiBearerAuth('access-token')
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllBusinesses(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const directorId = req.user.id;

    return this.businessService.getAllBusinesses(directorId);
  }

  @ApiOperation({
    summary: 'Удаление бизнеса за его айди',
    description: 'Позволяет пользователя удалить бизнесс введя его айди',
  })
  @ApiNotFoundResponse({ description: 'Бизнес не найден' })
  @ApiOkResponse({ description: 'Бизнес успешно удален' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteBusinessById(@Param('id') id: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const directorId = req.user.id;

    return this.businessService.deleteBusinessById(id, directorId);
  }
}
