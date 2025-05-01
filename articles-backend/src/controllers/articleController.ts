import { Request, Response, NextFunction } from 'express';
import * as articleService from '../services/articleService';

export const getAllArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const articles = await articleService.getAllArticles();
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content, tag } = req.body;
    const username = (req as Request & { user?: { username: string } }).user?.username;

    if (!username) {
      res.status(401).json({ error: 'Unauthorized: username missing' });
      return;
    }

    const article = await articleService.createArticle({ title, content, username, tag }, username);
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};


export const getArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const article = await articleService.getArticleById(Number(id));

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.json(article);
  } catch (err) {
    next(err);
  }
};

// export const getArticleByTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { tag } = req.params;
//     const articles = await articleService.getArticlesByTag(tag);
//     res.json(articles);
//   } catch (err) {
//     next(err);
//   }
// };
