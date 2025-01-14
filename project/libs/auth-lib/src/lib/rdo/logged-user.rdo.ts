import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({example: 'user123', description: 'Уникальный идентификатор пользователя'})
  @Expose()
  public id: string;

  @ApiProperty({example: 'user@example.com', description: 'Email пользователя'})
  @Expose()
  public email: string;

  @ApiProperty({example: 'JWT_ACCESS_TOKEN', description: 'Access-токен'})
  @Expose()
  public accessToken: string;
}
