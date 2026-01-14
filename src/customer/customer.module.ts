import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [RedisModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
