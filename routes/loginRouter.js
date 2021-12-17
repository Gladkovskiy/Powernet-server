import express from 'express'

import {check, login} from '../controllers/loginController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new express.Router()

router.post('/', login)
router.get('/', authMiddleware, check)

export default router
