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

export const getAllArticles = () => {
  return articleRepository.findAll();
};

export const getArticleById = (id: number) => {
  return articleRepository.findById(id);
};

export const getArticlesByUserId = (userId: number) => {
  return articleRepository.findByUserID(userId);
};

export const getArticleByTag = (tag: string) => {
  return articleRepository.findByTag(tag);
}
