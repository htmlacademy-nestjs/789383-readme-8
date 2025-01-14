export interface BlogComment {
  id?: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: Date;
}
