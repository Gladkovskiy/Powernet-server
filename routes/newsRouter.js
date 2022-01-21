import express from 'express'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'

import {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getOneNews,
} from '../controllers/newsController.js'

const router = new express.Router()

router.post('/', checkRoleMiddleware('ADMIN'), createNews)
router.put('/', checkRoleMiddleware('ADMIN'), updateNews)
router.delete('/', checkRoleMiddleware('ADMIN'), deleteNews)
router.get('/', getAllNews)
router.get('/:id', getOneNews)

export default router
