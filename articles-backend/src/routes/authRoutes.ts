import { Router } from 'express'
import * as authController from '../controllers/authController'

const router = Router()

router.post('/register', authController.register)
router.post('/register/tg', authController.registerTG)
router.post('/login', authController.login)

router.get('/', authController.getAllUsers)
router.get('/:id', authController.getUserById)

router.put('/:id', authController.updateUserById)
router.delete('/:id', authController.deleteUserByID)

export default router
