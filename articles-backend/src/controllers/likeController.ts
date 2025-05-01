import { Request, Response } from 'express';
import { LikeService } from '../services/likeService';

const likeService = new LikeService();

export class LikeController {
  async likeArticle(req: Request, res: Response) {
    const userId = req.user?.id;
    if (userId == undefined) {
      res.status(401).json({error: "Cannot get user's id"})
      return
    }
    const articleId = Number(req.body.articleId);

    try {
      await likeService.likeArticle(userId, articleId);
      res.status(200).json({ message: 'Article liked' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async unlikeArticle(req: Request, res: Response) {
    const userId = req.user?.id;
    if (userId == undefined) {
      res.status(401).json({error: "Cannot get user's id"})
      return
    }
    const articleId = Number(req.body.articleId);

    try {
      await likeService.unlikeArticle(userId, articleId);
      res.status(200).json({ message: 'Like removed' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async isArticleLiked(req: Request, res: Response) {
    const userId = req.user?.id;
    if (userId == undefined) {
      res.status(401).json({error: "Cannot get user's id"})
      return
    }
    const articleId = Number(req.query.articleId);

    const liked = await likeService.isArticleLiked(userId, articleId);
    res.status(200).json({ liked });
  }
}
