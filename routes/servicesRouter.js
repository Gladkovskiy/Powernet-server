import express from 'express'

import {updateServices} from '../controllers/servicesController.js'

const router = new express.Router()

router.put('/', updateServices)

export default router
