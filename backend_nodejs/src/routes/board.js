import {Router} from 'express'
import BoardController from '../controller/BoardController.js'

const router = Router()

router.get('/', BoardController.getAll)

export default router
