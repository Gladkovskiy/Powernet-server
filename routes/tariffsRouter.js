import express from 'express'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import {
  createTariffs,
  getTariffs,
  getOneTariff,
  getServices,
  deleteTariffs,
  updateTariffs,
} from '../controllers/tariffsController.js'

const router = new express.Router()

router.post('/', checkRoleMiddleware('ADMIN'), createTariffs)
router.get('/', getTariffs)
router.get('/:id', getOneTariff)
router.get('/services/price', getServices)
router.delete('/', checkRoleMiddleware('ADMIN'), deleteTariffs)
router.put('/', checkRoleMiddleware('ADMIN'), updateTariffs)

export default router
