import { ConflictException, Injectable } from '@nestjs/common';
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
    return await this.prismaService.business.findMany({
      where: {
        directorId,
      },
    });
  }
}
