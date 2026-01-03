import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Имя должно содержать только буквы' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  firstName: string;

  @IsString({ message: 'Фамилия должно содержать только буквы' })
  @IsNotEmpty({ message: 'Фамилия не должно быть пустым' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  email: string;
}
