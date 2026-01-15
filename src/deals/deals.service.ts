import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { Redis } from '@upstash/redis';

@Injectable()
export class DealsService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly prismaService: PrismaService,
  ) {}

  async createDeal(dto: CreateDealDto, directorId: string) {
    const business = await this.prismaService.business.findFirst({
      where: {
        id: dto.businessId,
        directorId,
      },
    });

    if (!business) {
      throw new ForbiddenException(
        'Вы не можете создавать сделку с несуществующего бизнеса',
      );
    }

    const customer = await this.prismaService.customer.findFirst({
      where: {
        id: dto.customerId,
        userId: directorId,
      },
    });

    if (!customer) {
      throw new ForbiddenException('Указанный клиент не найден в вашей базе');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const deal = await this.prismaService.deal.create({
      data: {
        ...dto,
        directorId,
      },
    });

    await this.redis.del(`deals_stats:${directorId}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return deal;
  }

  async deleteDeal(id: string, directorId: string) {
    const deal = await this.prismaService.deal.deleteMany({
      where: {
        directorId,
        id,
      },
    });

    if (!deal) {
      throw new NotFoundException('Сделка не найдена');
    }

    return 'Сделка была успешна удалена';
  }
}
