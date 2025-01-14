import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  COMMENT_NOT_FOUND,
  COMMENT_FORBIDDEN_DELETE,
  COMMENT_TEXT_LENGTH_ERROR,
  POST_NOT_PUBLISHED
} from './blog-comment.constant';
import {BlogPostService} from "../blog-post/blog-post.service";
import {PostState} from "../blog-post/types/post-state.enum";

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  public async createComment(authorId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    if (dto.text.length < 10 || dto.text.length > 300) {
      throw new ForbiddenException(COMMENT_TEXT_LENGTH_ERROR);
    }

    const post = await this.blogPostService.getPost(dto.postId);
    if (post.state !== PostState.PUBLISHED) {
      throw new ForbiddenException(POST_NOT_PUBLISHED);
    }

    const commentEntity = new BlogCommentEntity({
      postId: dto.postId,
      authorId,
      text: dto.text,
      createdAt: new Date(),
    });
    await this.blogCommentRepository.save(commentEntity);
    return commentEntity;
  }

  public async deleteComment(authorId: string, commentId: string): Promise<void> {
    const existComment = await this.blogCommentRepository.findById(commentId);
    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }

    if (existComment.authorId !== authorId) {
      throw new ForbiddenException(COMMENT_FORBIDDEN_DELETE);
    }

    await this.blogCommentRepository.deleteById(commentId);
  }

  public async getCommentsByPostId(postId: string) {
    const post = await this.blogPostService.getPost(postId);
    if (post.state !== PostState.PUBLISHED) {
      throw new ForbiddenException(POST_NOT_PUBLISHED);
    }

    return this.blogCommentRepository.findByPostId(postId);
  }
}
