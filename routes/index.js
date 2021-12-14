import express from 'express'
import newsRouter from './newsRouter.js'
import userRouter from './userRouter.js'
import tariffsRouter from './tariffsRouter.js'
import servicesRouter from './servicesRouter.js'

const router = new express.Router()

//Объединение всех роутеров в один
router.use('/news', newsRouter)
router.use('/user', userRouter)
router.use('/tariffs', tariffsRouter)
router.use('/services', servicesRouter)

export default router
