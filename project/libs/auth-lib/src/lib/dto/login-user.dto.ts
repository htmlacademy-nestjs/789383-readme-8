import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  public email: string;

  @ApiProperty({
    example: 'secretPass123',
    description: 'Пароль пользователя',
  })
  public password: string;
}
