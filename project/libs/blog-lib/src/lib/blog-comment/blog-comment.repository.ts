import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';

@Injectable()
export class BlogCommentRepository extends BaseMemoryRepository<BlogCommentEntity> {
  constructor(entityFactory: BlogCommentFactory) {
    super(entityFactory);
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const all = Array.from(this.entities.values());
    const filtered = all.filter((post) => post.postId === postId);

    return filtered.map((obj: BlogCommentEntity) => this.entityFactory.create(obj));
  }
}
