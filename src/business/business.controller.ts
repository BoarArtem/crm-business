/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Req, Body, UseGuards, Get } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBusiness(@Body() dto: CreateBusinessDto, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const directorId = req.user.id;

    return this.businessService.createBusiness(dto, directorId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllBusinesses(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const directorId = req.user.id;

    return this.businessService.getAllBusinesses(directorId);
  }
}
