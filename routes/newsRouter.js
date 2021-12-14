import express from 'express'

import {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getOneNews,
} from '../controllers/newsController.js'

const router = new express.Router()

router.post('/', createNews)
router.put('/', updateNews)
router.delete('/', deleteNews)
router.get('/', getAllNews)
router.get('/:id', getOneNews)

export default router
