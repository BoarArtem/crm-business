/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import type { Request } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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
}
