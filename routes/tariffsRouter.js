import express from 'express'

import {
  createTariffs,
  getTariffs,
  deleteTariffs,
  updateTariffs,
} from '../controllers/tariffsController.js'

const router = new express.Router()

router.post('/', createTariffs)
router.get('/', getTariffs)
router.delete('/', deleteTariffs)
router.put('/', updateTariffs)

export default router
