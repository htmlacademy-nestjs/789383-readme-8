import {Module} from '@nestjs/common';
import {BlogCommentService} from './blog-comment.service';
import {BlogCommentController} from './blog-comment.controller';
import {BlogCommentRepository} from './blog-comment.repository';
import {BlogCommentFactory} from './blog-comment.factory';
import {BlogPostModule} from "@project/blog-lib";

@Module({
  imports: [BlogPostModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
  exports: [BlogCommentService],
})
export class BlogCommentModule {
}
