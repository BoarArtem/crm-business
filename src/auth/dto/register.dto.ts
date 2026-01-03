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
  @IsString({ message: 'Имя должно содержать только буквы' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  firstName: string;

  @IsString({ message: 'Фамилия должно содержать только буквы' })
  @IsNotEmpty({ message: 'Фамилия не должно быть пустым' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  email: string;

  @IsInt({ message: 'Эта поле должно быть числом' })
  @IsNotEmpty({ message: 'Это поле не должно быть пустым' })
  @IsPositive({ message: 'Это поле не должно быть отрицательным' })
  businessQuantity: number;

  @IsString({ message: 'Пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязательное для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @MaxLength(128, { message: 'Пароль не содержать более 128 символов' })
  password: string;
}
