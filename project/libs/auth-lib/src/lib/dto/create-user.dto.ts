import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Уникальный email пользователя',
  })
  public email: string;

  @ApiProperty({
    example: 'John',
    description: 'Имя пользователя',
  })
  public firstname: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    required: false,
    description: 'Ссылка на аватар',
  })
  public avatar?: string;

  @ApiProperty({
    example: 'secretPass123',
    description: 'Пароль пользователя',
  })
  public password: string;
}
