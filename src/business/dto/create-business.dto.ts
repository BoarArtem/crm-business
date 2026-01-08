import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Данное поле предназначеное для названия вашего бизнеса',
    required: true,
    type: String,
  })
  @IsString({ message: 'Название бизнеса должно быть строкой' })
  @IsNotEmpty({ message: 'Название бизнеса не может быть пустым' })
  @Length(2, 15, {
    message: 'Название бизнеса не должно быть меньше 2 и не больше 15 символов',
  })
  businessName: string;

  @ApiProperty({
    example:
      'Продажа электронных девайсов для вашего личного использования только у нас в Apple!',
    description: 'Данное поле предназначеное для описания вашего бизнеса',
    required: true,
    type: String,
  })
  @IsString({ message: 'Описание бизнеса должно быть строкой' })
  @IsNotEmpty({ message: 'Описание бизнеса не может быть пустым' })
  @MaxLength(200, {
    message: 'Описание бизнеса не должно быть меньше 2 и не больше 15 символов',
  })
  businessDescription: string;

  @ApiProperty({
    example: 3422458932,
    description: 'Данное поле предназначеное для капитализации вашего бизнеса',
    required: true,
    type: Number,
  })
  @IsInt({ message: 'Капитализация вашего бизнеса должно быть числом' })
  @IsNotEmpty({ message: 'Капитализация бизнеса не может быть пустым' })
  businessCapitalization: number;
}
