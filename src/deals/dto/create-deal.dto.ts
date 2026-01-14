import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsUUID,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';
import { DealStatus } from '../../../generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDealDto {
  @ApiProperty({
    example: 'Закупить кофемашины',
    description: 'Данное поле предназначеное для названия сделки',
    required: true,
    type: String,
  })
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  title: string;

  @ApiProperty({
    example: 'Закупить у клиента 1300 кофемашин',
    description: 'Данное поле предназначеное для описании сделки',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;

  @ApiProperty({
    example: '1500.40',
    description: 'Данное поле предназначеное для цены сделки',
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsPositive({ message: 'Сумма сделаки не может быть негативным' })
  @IsNotEmpty({ message: ' Сумма сделки не может быть пустым' })
  amount: number;

  @ApiProperty({
    example: 'USD',
    description: 'Данное поле предназначеное для валюты сделки',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Валюта должна быть строкой' })
  currency?: string;

  @ApiProperty({
    example: 'NEW, CLOSE',
    description: 'Данное поле предназначеное для статуса сделки',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsEnum(DealStatus)
  status?: DealStatus;

  @ApiProperty({
    example: 'bf6afd9c-6c2f-4f28-84e6-155184bad695',
    description: 'Данное поле предназначеное для ввода айди бизнеса',
    required: true,
    type: String,
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Айди бизнеса не может быть пустым' })
  businessId: string;

  @ApiProperty({
    example: '7ebb3e44-0559-438a-8c51-30d47adc0e26',
    description: 'Данное поле предназначеное для ввода айди клиента',
    required: true,
    type: String,
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Айди клиента не может быть пустым' })
  customerId: string;
}
