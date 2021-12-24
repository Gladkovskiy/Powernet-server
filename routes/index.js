import express from 'express'
import newsRouter from './newsRouter.js'
import userRouter from './userRouter.js'
import tariffsRouter from './tariffsRouter.js'
import servicesRouter from './servicesRouter.js'
import loginRouter from './loginRouter.js'
import roleRouter from './roleRouter.js'

const router = new express.Router()

//Объединение всех роутеров в один
router.use('/news', newsRouter)
router.use('/user', userRouter)
router.use('/tariffs', tariffsRouter)
router.use('/services', servicesRouter)
router.use('/login', loginRouter)
router.use('/role', roleRouter)

export default router
