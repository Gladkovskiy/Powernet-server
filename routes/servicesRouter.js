import express from 'express'
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js'
import {updateServices} from '../controllers/servicesController.js'

const router = new express.Router()

router.put('/', checkRoleMiddleware('ADMIN'), updateServices)

export default router
