import { Body, Controller, Post, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import type { Request } from 'express';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // createCustomer(@Body() dto: CreateCustomerDto, @Req() req: Request) {
  //   return this.customerService.createCustomer(dto, req.user.id);
  // }
}
