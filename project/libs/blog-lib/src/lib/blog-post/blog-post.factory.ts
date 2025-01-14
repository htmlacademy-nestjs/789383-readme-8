import {Injectable} from '@nestjs/common';
import {EntityFactory} from '@project/core';
import {BlogPostEntity} from './blog-post.entity';
import {BlogPost} from './blog-post.interface';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: BlogPost): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }
}
