import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsPositive,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Artem',
    description: 'Данное поле предназначеное для имя пользователя',
    required: true,
    type: String,
  })
  @IsString({ message: 'Имя должно содержать только буквы' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  firstName: string;

  @ApiProperty({
    example: 'Boiar',
    description: 'Данное поле предназначеное для фамилии пользователя',
    required: true,
    type: String,
  })
  @IsString({ message: 'Фамилия должно содержать только буквы' })
  @IsNotEmpty({ message: 'Фамилия не должно быть пустым' })
  lastName: string;

  @ApiProperty({
    example: 'testapi@gmail.com',
    description:
      'Данное поле предназначеное для электронной почты пользователя',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  email: string;

  @ApiProperty({
    example: 1,
    description:
      'Данное поле предназначеное для количества имеющиехся бинзесом пользователем',
    required: false,
    type: Number,
  })
  @IsInt({ message: 'Эта поле должно быть числом' })
  @IsNotEmpty({ message: 'Это поле не должно быть пустым' })
  @IsPositive({ message: 'Это поле не должно быть отрицательным' })
  businessQuantity: number;

  @ApiProperty({
    example: 12345678,
    description: 'Данное поле предназначеное для пароля пользователя',
    required: true,
    type: String,
  })
  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязательное для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @MaxLength(128, { message: 'Пароль не содержать более 128 символов' })
  password: string;
}
