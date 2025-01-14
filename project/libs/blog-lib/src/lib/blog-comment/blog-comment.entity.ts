import { Entity, StorableEntity } from '@project/core';
import { BlogComment } from './blog-comment.interface';

export class BlogCommentEntity extends Entity implements StorableEntity<BlogComment> {
  public postId: string;
  public authorId: string;
  public text: string;
  public createdAt: Date;

  constructor(comment?: BlogComment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: BlogComment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? '';
    this.postId = comment.postId;
    this.authorId = comment.authorId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
  }

  public toPOJO(): BlogComment {
    return {
      id: this.id,
      postId: this.postId,
      authorId: this.authorId,
      text: this.text,
      createdAt: this.createdAt,
    };
  }
}
