import express from 'express'

import {
  createTariffs,
  getTariffs,
  getOneTariff,
  getServices,
  deleteTariffs,
  updateTariffs,
} from '../controllers/tariffsController.js'

const router = new express.Router()

router.post('/', createTariffs)
router.get('/', getTariffs)
router.get('/:id', getOneTariff)
router.get('/services/price', getServices)
router.delete('/', deleteTariffs)
router.put('/', updateTariffs)

export default router
