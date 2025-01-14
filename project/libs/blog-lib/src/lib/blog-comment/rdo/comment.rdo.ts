import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CommentRdo {
  @ApiProperty({
    example: 'comment123',
    description: 'Уникальный ID комментария',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'post123',
    description: 'ID поста, к которому относится комментарий',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    example: 'user123',
    description: 'ID автора, который оставил комментарий',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    example: 'Nice post!',
    description: 'Текст комментария',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    example: '2025-01-01T12:00:00.000Z',
    description: 'Дата и время создания комментария',
  })
  @Expose()
  public createdAt: Date;
}
