import express from 'express'

import {
  createUser,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
} from '../controllers/userController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'

const router = new express.Router()

// router.post('/', checkRoleMiddleware('ADMIN'), createUser)
router.post('/', createUser)
router.get('/', getUser)
router.get('/:ipOrName', getAllUser)
router.delete('/', deleteUser)
router.put('/', updateUser)

export default router
