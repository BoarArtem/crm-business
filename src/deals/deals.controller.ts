import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @ApiOperation({
    summary: 'Создание сделки',
    description: 'Позволяет создать сделку с клиентом',
  })
  @ApiBody({ type: CreateDealDto })
  @ApiBearerAuth('access-token')
  @ApiForbiddenResponse({
    description: 'Вы не можете создавать сделку с несуществующего бизнеса',
  })
  @ApiForbiddenResponse({
    description: 'Указанный клиент не найден в вашей базе',
  })
  @ApiCreatedResponse({
    description: 'Сделка успешна создана / информация сделки',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createDeal(@Body() dto: CreateDealDto, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const directorId = req.user.id;

    return this.dealsService.createDeal(dto, directorId);
  }

  @ApiOperation({
    summary: 'Удаление сделки за его айди',
    description: 'Позволяет директору полностью удалить созданую сделку',
  })
  @ApiOkResponse({
    description: 'Сделка успешно удалена',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteDeal(@Param('id') id: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.dealsService.deleteDeal(id, userId);
  }
}
