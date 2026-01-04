import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateBusinessDto {
  @IsString({ message: 'Название бизнеса должно быть строкой' })
  @IsNotEmpty({ message: 'Название бизнеса не может быть пустым' })
  @Length(2, 15, {
    message: 'Название бизнеса не должно быть меньше 2 и не больше 15 символов',
  })
  businessName: string;

  @IsString({ message: 'Описание бизнеса должно быть строкой' })
  @IsNotEmpty({ message: 'Описание бизнеса не может быть пустым' })
  @MaxLength(200, {
    message: 'Описание бизнеса не должно быть меньше 2 и не больше 15 символов',
  })
  businessDescription: string;

  @IsInt({ message: 'Капитализация вашего бизнеса должно быть числом' })
  @IsNotEmpty({ message: 'Капитализация бизнеса не может быть пустым' })
  businessCapitalization: number;
}
