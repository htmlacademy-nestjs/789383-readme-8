import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { plainToInstance } from 'class-transformer';
import { CommentRdo } from './rdo/comment.rdo';
import {ApiTags} from "@nestjs/swagger";
import {
  CreateCommentApiDocs,
  DeleteCommentApiDocs,
  GetCommentsByPostApiDocs
} from "./decorators/comment-swagger.decorator";

@ApiTags('comments')
@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @Post()
  @CreateCommentApiDocs()
  public async create(@Body() dto: CreateCommentDto) {
    const authorId = 'user-id-from-token'; // из JWT
    const comment = await this.blogCommentService.createComment(authorId, dto);
    return plainToInstance(CommentRdo, comment.toPOJO(), { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @DeleteCommentApiDocs()
  public async delete(@Param('id') commentId: string) {
    const authorId = 'some-user-id-from-token'; // из JWT
    await this.blogCommentService.deleteComment(authorId, commentId);
    return { message: 'Comment deleted' };
  }

  @Get('post/:postId')
  @GetCommentsByPostApiDocs()
  public async getComments(
    @Param('postId') postId: string,
  ) {
    const comments = await this.blogCommentService.getCommentsByPostId(postId);
    return comments.map((comment) => plainToInstance(CommentRdo, comment.toPOJO(), { excludeExtraneousValues: true }));
  }
}
