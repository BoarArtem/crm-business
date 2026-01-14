import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Redis } from '@upstash/redis';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly prismaService: PrismaService,
  ) {}

  private getCachedKey(userId: string): string {
    return `customers:${userId}`;
  }

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

    await this.redis.del(this.getCachedKey(userId));
    return customer;
  }

  async getAllCustomer(userId: string) {
    const cacheKey = this.getCachedKey(userId);

    try {
      const cached = await this.redis.get(cacheKey);

      if (cached) {
        console.log('Данные из кеша');
        console.log(cached);
        return cached;
      }

      const cachedCustomers = await this.redis.get<any[]>(cacheKey);

      if (cachedCustomers) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return cachedCustomers;
      }

      const allCustomers = await this.prismaService.customer.findMany({
        where: {
          userId,
        },
      });

      if (!allCustomers || allCustomers.length === 0) {
        throw new NotFoundException('Клиенты не найдены');
      }

      await this.redis.set(cacheKey, allCustomers, { ex: 3600 });

      return allCustomers;
    } catch (err: any) {
      if (err instanceof NotFoundException) throw err;

      return await this.prismaService.customer.findMany({
        where: {
          userId,
        },
      });
    }
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
