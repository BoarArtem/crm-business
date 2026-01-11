import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUser(dto: UpdateUserDto, userId: string) {
    const { firstName, lastName } = dto;

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    return updatedUser;
  }

  async deleteUser(userId: string) {
    return this.prismaService.$transaction(async (ctx) => {
      await ctx.business.deleteMany({ where: { directorId: userId } });
      await ctx.customer.deleteMany({ where: { userId: userId } });

      const deletedUser = await ctx.user.delete({ where: { id: userId } });

      return deletedUser;
    });
  }
}
