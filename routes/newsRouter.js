import express from 'express'

import {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getOneNews,
} from '../controllers/newsController.js'
// import checkRole from '../middleware/checkRoleMiddleware.js'

const router = new express.Router()

router.post('/', createNews)
router.put('/', updateNews)
router.delete('/', deleteNews)
router.get('/', getAllNews)
router.get('/:id', getOneNews)

// router.get('/', brandController.getAll)
// router.delete('/',  brandController.deleteOne)

export default router
