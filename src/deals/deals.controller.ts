import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiCreatedResponse,
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
}
