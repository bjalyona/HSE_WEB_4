import { Router } from 'express';
import * as tgController from '../controllers/tgController';

const router = Router()

router.post('/', tgController.createArticle)

export default router