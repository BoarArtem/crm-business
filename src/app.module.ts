import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { BusinessModule } from './business/business.module';
import { TelegramModule } from './telegram/telegram.module';
import { UsersModule } from './users/users.module';
import { PrometheusModule } from './prometheus/prometheus.module';
import { PrometheusController } from './prometheus/prometheus.controller';
import { RedisModule } from './redis/redis.module';
import { DealsModule } from './deals/deals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CustomerModule,
    BusinessModule,
    TelegramModule,
    UsersModule,
    PrometheusModule,
    RedisModule,
    DealsModule,
  ],
  controllers: [PrometheusController],
})
export class AppModule {}
