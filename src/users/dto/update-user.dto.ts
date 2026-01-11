import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Danya',
    description: 'Данное поле предназначеное для имени пользователя',
    required: true,
    type: String,
  })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя пользователя не должно быть пустым' })
  firstName: string;

  @ApiProperty({
    example: 'Moisey',
    description: 'Данное поле предназначеное для фамилии пользователя',
    required: true,
    type: String,
  })
  @IsString({ message: 'Фамилия пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Фамилия пользователя не должно быть пустым' })
  lastName: string;
}
