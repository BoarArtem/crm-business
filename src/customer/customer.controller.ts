/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
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
  ApiNotFoundResponse,
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

  @ApiOperation({
    summary: 'Получение всех клиентов пользователя',
    description: 'Позволяет получить всех клиентов который создал пользователь',
  })
  @ApiNotFoundResponse({ description: 'Клиенты не найдены' })
  @ApiBearerAuth('access-token')
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllCustomers(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.customerService.getAllCustomer(userId);
  }

  @ApiOperation({
    summary: 'Получение одного клиента за его айди',
    description: 'Позволяет получить информацию об клиента введя его айди',
  })
  @ApiNotFoundResponse({ description: 'Данный клиент не найден' })
  @ApiBearerAuth('access-token')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getCustomerById(@Param('id') id: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.customerService.getCustomerById(id, userId);
  }

  @ApiOperation({
    summary: 'Удаление пользователя за его айди',
    description: 'Позволяет удалить клиента за его айди',
  })
  @ApiNotFoundResponse({ description: 'Клиент не найден' })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteCustomerById(@Param('id') id: string, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;

    return this.customerService.deleteCustomerById(id, userId);
  }
}
