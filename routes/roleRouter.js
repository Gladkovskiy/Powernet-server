import express from 'express'

import {getRole} from '../controllers/roleController.js'

const router = new express.Router()
router.get('/', getRole)

// router.post('/', createTariffs)
// router.delete('/', deleteTariffs)
// router.put('/', updateTariffs)

export default router
