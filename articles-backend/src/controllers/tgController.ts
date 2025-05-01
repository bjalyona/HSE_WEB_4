import { Request, Response, NextFunction } from 'express';
import * as articleService from '../services/articleService';

export const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
	  const { username, title, content, tag } = req.body;
  
	  if (!username) {
		res.status(401).json({ error: 'Unauthorized: username missing' });
		return;
	  }
  
	  const article = await articleService.createArticle({ username, title, content, tag }, username);
	  res.status(201).json(article);
	} catch (err) {
	  next(err);
	}
  };

  