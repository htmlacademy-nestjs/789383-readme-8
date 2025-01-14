import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    example: 'post123',
    description: 'ID поста, к которому относится комментарий'
  })
  public postId: string;

  @ApiProperty({
    example: 'Great post!',
    description: 'Текст комментария'
  })
  public text: string;
}
