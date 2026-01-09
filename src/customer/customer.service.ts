import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const allCustomers = await this.prismaService.customer.findMany({
      where: {
        userId,
      },
    });

    if (!allCustomers) {
      throw new NotFoundException('Клиенты не найдены');
    }

    return allCustomers;
  }

  async getCustomerById(id: string, userId: string) {
    const customer = await this.prismaService.customer.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Данный клиент не найден');
    }

    return customer;
  }

  async deleteCustomerById(id: string, userId: string) {
    const customer = await this.prismaService.customer.delete({
      where: {
        id,
        userId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Клиент не найден');
    }

    return 'Клиент удален';
  }
}
