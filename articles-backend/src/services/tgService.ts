import * as articleRepository from '../repositories/articleRepository';

interface ArticleData {
  username: string;
  title: string;
  content: string;
  tag: string;   
}

export const createArticle = (data: ArticleData, username: string) => {
  return articleRepository.create(data, username);
};