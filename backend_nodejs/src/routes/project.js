import {Router} from 'express'
import ProjectController from '../controller/ProjectController.js'

const router = Router()

router.get('/', ProjectController.getAll)
router.get('/:id', ProjectController.getOne)
router.post('/', ProjectController.create)

export default router
