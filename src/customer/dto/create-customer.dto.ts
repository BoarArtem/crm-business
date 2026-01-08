import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Vasya',
    description: 'Данное поле предназначеное для имя клиента',
    required: true,
    type: String,
  })
  @IsString({ message: 'Имя должно содержать только буквы' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  firstName: string;

  @ApiProperty({
    example: 'Vasevich',
    description: 'Данное поле предназначеное для фамилии клиента',
    required: true,
    type: String,
  })
  @IsString({ message: 'Фамилия должно содержать только буквы' })
  @IsNotEmpty({ message: 'Фамилия не должно быть пустым' })
  lastName: string;

  @ApiProperty({
    example: 'vasya@gmail.com',
    description: 'Данное поле предназначеное для электронной почты клиента',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  email: string;
}
