import { Expose } from 'class-transformer';
import {PostType} from "../types/post.enum";
import {PostState} from "../types/post-state.enum";
import {ApiProperty} from "@nestjs/swagger";

export class PostRdo {
  @ApiProperty({ example: 'abc123', description: 'Post ID' })
  @Expose()
  public id: string;

  @ApiProperty({ example: 'user123', description: 'Author ID' })
  @Expose()
  public authorId: string;

  @ApiProperty({
    example: 'original-author123',
    required: false,
    description: 'Original author ID for reposts'
  })
  @Expose()
  public originalAuthorId?: string;

  @ApiProperty({
    example: 'original-post123',
    required: false,
    description: 'Original post ID for reposts'
  })
  @Expose()
  public originalPostId?: string;

  @ApiProperty({ example: false, description: 'Whether post is a repost' })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({ enum: PostType, description: 'Type of the post' })
  @Expose()
  public type: PostType;

  @ApiProperty({ enum: PostState, description: 'State of the post' })
  @Expose()
  public state: PostState;

  @ApiProperty({ example: '2025-01-01T12:00:00.000Z', description: 'Post creation date' })
  @Expose()
  public createdAt: Date;

  @ApiProperty({ example: '2025-01-02T12:00:00.000Z', description: 'Date when the post was published' })
  @Expose()
  public publishedAt: Date;

  @ApiProperty({
    example: 'My cool post',
    required: false,
    description: 'Title of the post'
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    example: 'This is a short announcement',
    required: false,
    description: 'Short announcement or description of the post'
  })
  @Expose()
  public announcement?: string;

  @ApiProperty({
    example: 'This is the full text of the post',
    required: false,
    description: 'Full text of the post'
  })
  @Expose()
  public text?: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    required: false,
    description: 'URL of the photo'
  })
  @Expose()
  public photo?: string;

  @ApiProperty({
    example: 'https://example.com',
    required: false,
    description: 'Link associated with the post'
  })
  @Expose()
  public link?: string;

  @ApiProperty({
    example: 'To be or not to be',
    required: false,
    description: 'Quoted text in the post'
  })
  @Expose()
  public quoteText?: string;

  @ApiProperty({
    example: 'William Shakespeare',
    required: false,
    description: 'Author of the quoted text'
  })
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty({
    example: ['nestjs', 'swagger'],
    required: false,
    description: 'Tags associated with the post'
  })
  @Expose()
  public tags?: string[];
}
