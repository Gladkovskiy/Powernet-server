import express from 'express'
import ApiError from '../error/ApiError.js'
import {User, Score, Tariffs, Role} from '../models/models.js'
import bcrypt from 'bcrypt'
import sequelize from 'sequelize'

const Op = sequelize.Op

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const createUser = async (req, res, next) => {
  try {
    let {fio, adress, ip, login, password, tariffId, roleId, value, active} =
      req.body

    const findUser = await User.findOne({where: {[Op.or]: [{login}, {ip}]}})
    if (findUser)
      return next(
        ApiError.badRequest('Запись с таким логином или ip уже существует')
      )

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      fio,
      adress,
      ip,
      login,
      password: hashPassword,
      tariffId,
      roleId,
    })
    const score = await Score.create({userId: user.id, value, active})

    res.json({user, score})
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getUser = async (req, res, next) => {
  try {
    let {id} = req.params

    const user = await User.findOne({
      where: {[Op.or]: [{ip: id}, {fio: id}]},
      // attributes: ['id', 'fio', 'adress', 'ip', 'tariffId'],
      include: [
        {model: Role, attributes: ['type']},
        {model: Tariffs, attributes: ['name']},
      ],
    })

    if (user === null)
      return next(ApiError.badRequest('Такой пользователь не найден'))

    res.json(user)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getUserForId = async (req, res, next) => {
  try {
    let {id} = req.params

    const user = await User.findOne({
      where: {id},

      include: [
        {model: Role, attributes: ['type']},
        {model: Tariffs, attributes: ['name']},
      ],
    })

    if (user === null)
      return next(ApiError.badRequest('Такой пользователь не найден'))

    res.json(user)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getAllUser = async (req, res, next) => {
  try {
    let {ipOrName} = req.query

    if (ipOrName === '') return res.json([])

    const user = await User.findAll({
      where: {
        [Op.or]: [
          {ip: {[Op.startsWith]: ipOrName}},
          {fio: {[Op.startsWith]: ipOrName}},
        ],
      },
      attributes: ['id', 'fio', 'ip'],
    })

    res.json(user)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.query

    const result = await User.destroy({where: {id}})

    res.json(!!result)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const updateUser = async (req, res, next) => {
  try {
    const {
      id,
      fio,
      adress,
      ip,
      login,
      password,
      tariffId,
      roleId,
      editPassword,
    } = req.body
    let update = false
    let user
    const hashPassword = await bcrypt.hash(password, 5)

    if (editPassword) {
      user = await User.update(
        {fio, adress, ip, login, password: hashPassword, tariffId, roleId},
        {where: {id}}
      )
    } else {
      user = await User.update(
        {fio, adress, ip, login, tariffId, roleId},
        {where: {id}}
      )
    }

    if (user[0] === 1) update = true

    res.status(200).json(update)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}
