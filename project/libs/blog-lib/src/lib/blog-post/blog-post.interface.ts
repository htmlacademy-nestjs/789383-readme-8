import {PostType} from "./types/post.enum";
import {PostState} from "./types/post-state.enum";

export interface BlogPost {
  id?: string;
  authorId: string;
  originalAuthorId?: string;
  originalPostId?: string;
  isRepost: boolean;

  type: PostType;
  state: PostState;

  createdAt: Date;
  publishedAt: Date;

  title?: string;
  announcement?: string;
  text?: string;
  photo?: string;
  link?: string;
  quoteText?: string;
  quoteAuthor?: string;

  tags?: string[];
  likedUserIds?: string[];
}
