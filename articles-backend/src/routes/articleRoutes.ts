import { Router } from 'express';
import * as articleController from '../controllers/articleController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', articleController.getAllArticles);
router.post('/', authenticate, articleController.createArticle); 

export default router;
