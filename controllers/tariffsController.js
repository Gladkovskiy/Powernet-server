import express from 'express'
import ApiError from '../error/ApiError.js'
import {Tariffs} from '../models/models.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const createTariffs = async (req, res, next) => {
  try {
    let {name, price, connectionPrice, speed} = req.body

    const tariff = await Tariffs.create({name, price, connectionPrice, speed})

    res.json(tariff)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getTariffs = async (req, res, next) => {
  try {
    const tariffs = await Tariffs.findAll()

    res.json(tariffs)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const deleteTariffs = async (req, res, next) => {
  try {
    const {id} = req.query
    const tariffs = await Tariffs.destroy({where: {id}})

    res.json(!!tariffs)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const updateTariffs = async (req, res, next) => {
  try {
    const {id, name, price, connectionPrice, speed} = req.body
    let update = false
    const tariffs = await Tariffs.update(
      {name, price, connectionPrice, speed},
      {where: {id}}
    )

    if (tariffs[0] === 1) update = true

    res.status(200).json(update)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}
