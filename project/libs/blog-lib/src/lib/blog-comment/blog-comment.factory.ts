import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { BlogCommentEntity } from './blog-comment.entity';
import {BlogComment} from "./blog-comment.interface";

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: BlogComment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }
}
