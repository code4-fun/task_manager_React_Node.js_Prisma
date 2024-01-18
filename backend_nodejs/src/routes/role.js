import {Router} from 'express'
import RoleController from '../controller/RoleController.js'

const router = Router()

router.get('/', RoleController.getAll)
router.get('/search', RoleController.filter)
router.get('/:id', RoleController.getOneById)
router.post('/', RoleController.create)

export default router
