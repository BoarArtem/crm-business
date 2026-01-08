import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginDto {
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
