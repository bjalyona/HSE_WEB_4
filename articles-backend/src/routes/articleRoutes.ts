import { Router } from 'express';
import * as articleController from '../controllers/articleController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', articleController.getAllArticles);
router.get('/user/:id', articleController.getArticleByUserID)
router.get('/:id', articleController.getArticleById)
router.get('/tag/:tag', articleController.getArticleByTag)

router.post('/', authenticate, articleController.createArticle); 
router

export default router;
