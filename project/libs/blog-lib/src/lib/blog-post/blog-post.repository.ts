import {Injectable} from '@nestjs/common';
import {BaseMemoryRepository} from '@project/data-access';
import {BlogPostEntity} from './blog-post.entity';
import {BlogPostFactory} from './blog-post.factory';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  constructor(entityFactory: BlogPostFactory) {
    super(entityFactory);
  }

  public async findByAuthorId(authorId: string): Promise<BlogPostEntity[]> {
    const entities = Array.from(this.entities.values());
    const userPosts = entities.filter((post) => post.authorId === authorId);
    return userPosts.map((p) => this.entityFactory.create(p));
  }
}
