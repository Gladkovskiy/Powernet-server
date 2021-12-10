import express from 'express'
import newsRouter from './newsRouter.js'

const router = new express.Router()

//Объединение всех роутеров в один
router.use('/news', newsRouter)

/* router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/rayting', raytingRouter) */

export default router
