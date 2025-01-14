import {Entity, StorableEntity} from "@project/core";
import {BlogPost} from "./blog-post.interface";
import {PostType} from "./types/post.enum";
import {PostState} from "./types/post-state.enum";

export class BlogPostEntity extends Entity implements StorableEntity<BlogPost> {
  public authorId: string;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public isRepost: boolean;
  public type: PostType;
  public state: PostState;
  public createdAt: Date;
  public publishedAt: Date;

  public title?: string;
  public announcement?: string;
  public text?: string;
  public photo?: string;
  public link?: string;
  public quoteText?: string;
  public quoteAuthor?: string;

  public tags?: string[];
  public likedUserIds: string[] = [];

  constructor(post?: BlogPost) {
    super();
    this.populate(post);
  }

  public populate(post?: BlogPost): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.authorId = post.authorId;
    this.originalAuthorId = post.originalAuthorId;
    this.originalPostId = post.originalPostId;
    this.isRepost = post.isRepost;
    this.type = post.type;
    this.state = post.state;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;

    this.title = post.title;
    this.announcement = post.announcement;
    this.text = post.text;
    this.photo = post.photo;
    this.link = post.link;
    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;

    this.tags = post.tags;
    this.likedUserIds = post.likedUserIds ?? [];
  }

  public toPOJO(): BlogPost {
    return {
      id: this.id,
      authorId: this.authorId,
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      isRepost: this.isRepost,
      type: this.type as PostType,
      state: this.state as PostState,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,

      title: this.title,
      announcement: this.announcement,
      text: this.text,
      photo: this.photo,
      link: this.link,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,

      tags: this.tags,
      likedUserIds: this.likedUserIds
    };
  }
}
