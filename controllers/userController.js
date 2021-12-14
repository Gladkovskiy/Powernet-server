import express from 'express'
import ApiError from '../error/ApiError.js'
import {User, Score, Tariffs, Role} from '../models/models.js'
import bcrypt from 'bcrypt'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const createUser = async (req, res, next) => {
  try {
    let {fio, adress, ip, login, password, tariffId, roleId, value, active} =
      req.body
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
    let {id} = req.query

    const user = await User.findOne({
      where: {id},
      attributes: ['fio', 'adress', 'ip', 'tariffId'],
      include: [
        {model: Score, attributes: ['value', 'active']},
        {model: Tariffs, attributes: ['name']},
      ],
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
      value,
      active,
    } = req.body
    let update = false

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.update(
      {fio, adress, ip, login, password: hashPassword, tariffId, roleId},
      {where: {id}}
    )
    await Score.update({value, active}, {where: {userId: id}})
    if (user[0] === 1) update = true

    res.status(200).json(update)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}
