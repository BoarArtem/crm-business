/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import type { Request } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({
    summary: 'Создание нового клиента',
    description: 'Позволяет в ваш бизнес добавить нужного клиента',
  })
  @ApiBody({ type: CreateCustomerDto })
  @ApiConflictResponse({ description: 'Такой клиент уже найден' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не зарегестрирован' })
  @ApiCreatedResponse({ description: 'Успешно создаться клиент в ваш бизнес' })
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(JwtAuthGuard)
  createCustomer(@Body() dto: CreateCustomerDto, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.customerService.createCustomer(dto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllCustomers(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.customerService.getAllCustomer(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getCustomerById(@Param('id') id: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.customerService.getCustomerById(id, userId);
  }
}
