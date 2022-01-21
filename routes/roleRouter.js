import express from 'express'

import {getRole} from '../controllers/roleController.js'

const router = new express.Router()
router.get('/', getRole)

export default router
