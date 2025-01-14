import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {BlogPostService} from './blog-post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {PostRdo} from './rdo/post.rdo';
import {plainToInstance} from 'class-transformer';
import {ApiTags} from "@nestjs/swagger";
import {
  CreatePostApiDocs,
  DeletePostApiDocs,
  GetPostByIdApiDocs,
  LikePostApiDocs,
  RepostApiDocs,
  UnlikePostApiDocs,
  UpdatePostApiDocs
} from "./decorators/post-swagger.decorator";

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {
  }

  @Post()
  @CreatePostApiDocs()
  public async create(@Body() dto: CreatePostDto) {
    //todo
    const authorId = 'author-id-from-token';
    const newPost = await this.blogPostService.createPost(authorId, dto);
    return plainToInstance(PostRdo, newPost.toPOJO(), {excludeExtraneousValues: true});
  }

  @Get(':id')
  @GetPostByIdApiDocs()
  public async show(@Param('id') postId: string) {
    const post = await this.blogPostService.getPost(postId);
    return plainToInstance(PostRdo, post.toPOJO(), {excludeExtraneousValues: true});
  }

  @Patch(':id')
  @UpdatePostApiDocs()
  public async update(@Param('id') postId: string, @Body() dto: UpdatePostDto) {
    //todo
    const authorId = 'author-id-from-token';
    const updatedPost = await this.blogPostService.updatePost(authorId, postId, dto);
    return plainToInstance(PostRdo, updatedPost.toPOJO(), {excludeExtraneousValues: true});
  }

  @Delete(':id')
  @DeletePostApiDocs()
  public async delete(@Param('id') postId: string) {
    //todo
    const authorId = 'author-id-from-token';
    await this.blogPostService.deletePost(authorId, postId);
    return {message: 'Post deleted'};
  }

  @Post(':id/repost')
  @RepostApiDocs()
  public async repost(@Param('id') postId: string) {
    //todo
    const authorId = 'author-id-from-token';
    const repostEntity = await this.blogPostService.repost(authorId, postId);
    return plainToInstance(PostRdo, repostEntity.toPOJO(), {excludeExtraneousValues: true});
  }

  @Post(':id/like')
  @LikePostApiDocs()
  public async like(@Param('id') postId: string) {
    //todo
    const userId = 'user-id-from-token';
    const post = await this.blogPostService.likePost(userId, postId);
    return plainToInstance(PostRdo, post.toPOJO(), {excludeExtraneousValues: true});
  }

  @Post(':id/unlike')
  @UnlikePostApiDocs()
  public async unlike(@Param('id') postId: string) {
    //todo
    const userId = 'user-id-from-token';
    const post = await this.blogPostService.unlikePost(userId, postId);
    return plainToInstance(PostRdo, post.toPOJO(), {excludeExtraneousValues: true});
  }
}
