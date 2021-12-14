import express from 'express'

import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController.js'

const router = new express.Router()

router.post('/', createUser)
router.get('/', getUser)
router.delete('/', deleteUser)
router.put('/', updateUser)

export default router
