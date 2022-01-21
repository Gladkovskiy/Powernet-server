import express from 'express'
import {
  createUser,
  getUser,
  getAllUser,
  getUserForId,
  deleteUser,
  updateUser,
} from '../controllers/userController.js'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'

const router = new express.Router()

router.post('/', checkRoleMiddleware('ADMIN'), createUser)
router.get('/search/:id', getUser)
router.get('/:id', getUserForId)
router.get('/', getAllUser)
router.delete('/', checkRoleMiddleware('ADMIN'), deleteUser)
router.put('/', checkRoleMiddleware('ADMIN'), updateUser)

export default router
