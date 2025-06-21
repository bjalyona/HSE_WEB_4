export type Article = {
  id: number;
  title: string;
  content: string;
  tag: string;
  userId: number;
  likesCount: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
};