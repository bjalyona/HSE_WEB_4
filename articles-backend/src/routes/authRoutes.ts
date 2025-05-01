import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/register', authController.register);
router.post('/register/tg', authController.registerTG);
router.post('/login', authController.login);

export default router;
