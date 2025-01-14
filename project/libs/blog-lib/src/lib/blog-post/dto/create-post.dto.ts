import {PostType} from "../types/post.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    enum: PostType,
    description: 'Type of the post (e.g., TEXT, PHOTO, QUOTE)'
  })
  public type: PostType;

  @ApiProperty({
    example: ['nestjs', 'swagger'],
    required: false,
    description: 'Tags associated with the post'
  })
  public tags?: string[];

  @ApiProperty({
    example: 'My cool post',
    required: false,
    description: 'Title of the post'
  })
  public title?: string;

  @ApiProperty({
    example: 'https://example.com',
    required: false,
    description: 'Link associated with the post'
  })
  public link?: string;

  @ApiProperty({
    example: 'This is a short announcement',
    required: false,
    description: 'Short announcement or description of the post'
  })
  public announcement?: string;

  @ApiProperty({
    example: 'This is the full text of the post',
    required: false,
    description: 'Full text of the post'
  })
  public text?: string;

  @ApiProperty({
    example: 'To be or not to be',
    required: false,
    description: 'Quoted text in the post'
  })
  public quoteText?: string;

  @ApiProperty({
    example: 'William Shakespeare',
    required: false,
    description: 'Author of the quoted text'
  })
  public quoteAuthor?: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    required: false,
    description: 'URL of the photo'
  })
  public photo?: string;
}
