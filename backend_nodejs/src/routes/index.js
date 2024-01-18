import {Router} from 'express'
import project from './project.js'
import board from './board.js'
import role from './role.js'
import user from './user.js'

const router = Router()

router.use('/projects', project)
router.use('/boards', board)
router.use('/roles', role)
router.use('/users', user)

export default router
