import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  email: string;

  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязательное для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @MaxLength(128, { message: 'Пароль не содержать более 128 символов' })
  password: string;
}
