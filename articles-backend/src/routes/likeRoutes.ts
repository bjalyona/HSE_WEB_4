import { Router } from 'express';
import { LikeController } from '../controllers/likeController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const controller = new LikeController();

router.post('/like', authenticate, controller.likeArticle);
router.post('/unlike', authenticate, controller.unlikeArticle);
router.get('/is-liked', authenticate, controller.isArticleLiked);

export default router;
