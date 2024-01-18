import {Router} from 'express'
import UserController from '../controller/UserController.js'

const router = Router()

router.get('/', UserController.getAll)
router.post('/', UserController.create)

export default router
