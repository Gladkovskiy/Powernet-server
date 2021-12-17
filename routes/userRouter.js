import express from 'express'

import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'

const router = new express.Router()

router.post('/', checkRoleMiddleware('ADMIN'), createUser)
router.get('/', getUser)
router.delete('/', deleteUser)
router.put('/', updateUser)

export default router
