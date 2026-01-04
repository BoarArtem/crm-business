import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCustomer(dto: CreateCustomerDto, userId: string) {
    const { email } = dto;

    const existCustomer = await this.prismaService.customer.findFirst({
      where: {
        email,
        userId,
      },
    });

    if (existCustomer) {
      throw new ConflictException('Такой клиент уже найден');
    }

    const customer = await this.prismaService.customer.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
      },
    });

    return customer;
  }

  async getAllCustomer(userId: string) {
    return await this.prismaService.customer.findMany({
      where: {
        userId,
      },
    });
  }
}
