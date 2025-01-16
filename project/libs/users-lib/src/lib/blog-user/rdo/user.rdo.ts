import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    example: 'user123',
    description: 'Уникальный идентификатор пользователя',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'https://example.com/avatar.png',
    required: false,
    description: 'Ссылка на аватар пользователя',
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    example: 'John',
    description: 'Имя пользователя',
  })
  @Expose()
  public firstname: string;
}
