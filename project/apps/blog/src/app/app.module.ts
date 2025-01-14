import {Module} from '@nestjs/common';
import {BlogCommentModule, BlogPostModule} from "@project/blog-lib";

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
