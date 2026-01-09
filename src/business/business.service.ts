import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBusiness(dto: CreateBusinessDto, directorId: string) {
    const { businessName } = dto;

    const existBusiness = await this.prismaService.business.findFirst({
      where: {
        businessName,
      },
    });

    if (existBusiness) {
      throw new ConflictException('Такой бизнес уже существует');
    }

    const [business] = await this.prismaService.$transaction([
      this.prismaService.business.create({
        data: {
          ...dto,
          director: {
            connect: { id: directorId },
          },
        },
      }),

      this.prismaService.user.update({
        where: { id: directorId },
        data: {
          businessQuantity: {
            increment: 1,
          },
        },
      }),
    ]);

    return business;
  }

  async getAllBusinesses(directorId: string) {
    const AllBusinesses = await this.prismaService.business.findMany({
      where: {
        directorId,
      },
    });

    if (!AllBusinesses) {
      throw new NotFoundException('Ничего не найдено');
    }

    return AllBusinesses;
  }

  // for future fixing
  async deleteBusinessById(id: string, directorId: string) {
    const business = await this.prismaService.business.deleteMany({
      where: {
        id,
        directorId,
      },
    });

    if (!business) {
      throw new NotFoundException('Бизнес не найден');
    }

    return 'Бизнес успешно удален';
  }
}
