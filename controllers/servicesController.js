import express from 'express'
import ApiError from '../error/ApiError.js'
import {AdditionalServices} from '../models/models.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const updateServices = async (req, res, next) => {
  try {
    const {id, ...params} = req.body
    let update = false
    const services = await AdditionalServices.update({...params}, {where: {id}})

    if (services[0] === 1) update = true

    res.status(200).json(update)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}
