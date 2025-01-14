import {Injectable, ForbiddenException, NotFoundException} from '@nestjs/common';
import {BlogPostRepository} from './blog-post.repository';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {BlogPostEntity} from './blog-post.entity';
import {PostType} from "./types/post.enum";
import {PostState} from "./types/post-state.enum";
import {
  ORIGINAL_POST_NOT_FOUND, POST_ALREADY_LIKED,
  POST_FORBIDDEN_DELETE, POST_FORBIDDEN_LIKE, POST_FORBIDDEN_REPOST,
  POST_FORBIDDEN_UPDATE,
  POST_NOT_FOUND, POST_NOT_LIKED_YET,
  POST_TYPE_REQUIRED
} from "./blog-post.constant";

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {
  }

  public async createPost(authorId: string, dto: CreatePostDto): Promise<BlogPostEntity> {
    if (!dto.type) {
      throw new Error(POST_TYPE_REQUIRED);
    }

    const postEntity = new BlogPostEntity({
      authorId,
      originalAuthorId: null,
      originalPostId: null,
      isRepost: false,
      type: dto.type as PostType,
      state: PostState.PUBLISHED,
      createdAt: new Date(),
      publishedAt: new Date(),
      title: dto.title,
      announcement: dto.announcement,
      text: dto.text,
      photo: dto.photo,
      link: dto.link,
      quoteText: dto.quoteText,
      quoteAuthor: dto.quoteAuthor,
      tags: dto.tags,
      likedUserIds: [],
    });

    await this.blogPostRepository.save(postEntity);
    return postEntity;
  }

  public async updatePost(authorId: string, postId: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existPost = await this.blogPostRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    if (existPost.authorId !== authorId) {
      throw new ForbiddenException(POST_FORBIDDEN_UPDATE);
    }

    if (dto.state) {
      existPost.state = dto.state;
    }
    if (dto.publishedAt) {
      existPost.publishedAt = dto.publishedAt;
    }
    if (dto.title) {
      existPost.title = dto.title;
    }
    if (dto.announcement) {
      existPost.announcement = dto.announcement;
    }
    if (dto.text) {
      existPost.text = dto.text;
    }
    if (dto.photo) {
      existPost.photo = dto.photo;
    }
    if (dto.link) {
      existPost.link = dto.link;
    }
    if (dto.quoteText) {
      existPost.quoteText = dto.quoteText;
    }
    if (dto.quoteAuthor) {
      existPost.quoteAuthor = dto.quoteAuthor;
    }
    if (dto.tags) {
      existPost.tags = dto.tags;
    }

    await this.blogPostRepository.update(existPost);
    return existPost;
  }

  public async deletePost(authorId: string, postId: string): Promise<void> {
    const existPost = await this.blogPostRepository.findById(postId);
    if (!existPost) {
      throw new NotFoundException(POST_NOT_FOUND);
    }

    if (existPost.authorId !== authorId) {
      throw new ForbiddenException(POST_FORBIDDEN_DELETE);
    }

    await this.blogPostRepository.deleteById(postId);

    // TODO: blogCommentsService.deleteAllByPostId(postId)
  }

  public async repost(authorId: string, originalPostId: string): Promise<BlogPostEntity> {
    const originalPost = await this.blogPostRepository.findById(originalPostId);
    if (!originalPost) {
      throw new NotFoundException(ORIGINAL_POST_NOT_FOUND);
    }

    if (authorId === originalPost.authorId) {
      throw new ForbiddenException(POST_FORBIDDEN_REPOST);
    }

    const repostEntity = new BlogPostEntity({
      ...originalPost.toPOJO(),
      id: undefined,
      authorId,
      isRepost: true,
      originalAuthorId: originalPost.authorId,
      originalPostId: originalPost.id,
      createdAt: new Date(),
      publishedAt: new Date(),

      likedUserIds: [],
    });

    await this.blogPostRepository.save(repostEntity);
    return repostEntity;
  }

  public async getPost(postId: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    return post;
  }

  public async likePost(userId: string, postId: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    if(post.state !== PostState.PUBLISHED) {
      throw new ForbiddenException(POST_FORBIDDEN_LIKE);
    }
    if(post.likedUserIds.includes(userId)) {
      throw new ForbiddenException(POST_ALREADY_LIKED);
    }

    post.likedUserIds.push(userId);
    await this.blogPostRepository.update(post);
    return post;
  }

  public async unlikePost(userId: string, postId: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND);
    }
    if (!post.likedUserIds.includes(userId)) {
      throw new ForbiddenException(POST_NOT_LIKED_YET);
    }

    post.likedUserIds = post.likedUserIds.filter((id) => id !== postId);
    await this.blogPostRepository.save(post);
    return post;
  }
}
