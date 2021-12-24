import express from 'express'
import ApiError from '../error/ApiError.js'
import {Role} from '../models/models.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getRole = async (req, res, next) => {
  try {
    const role = await Role.findAll()

    res.json(role)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}
