import express from 'express'
import ApiError from '../error/ApiError.js'
import {News} from '../models/models.js'
import {v4 as uuidv4} from 'uuid'
import path from 'path'
import * as fs from 'fs'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const createNews = async (req, res, next) => {
  try {
    let {title, text} = req.body

    const {img} = req.files
    let fileName = uuidv4() + '.jpg'
    img.mv(path.resolve(path.resolve(), 'static', fileName))

    const news = await News.create({
      title,
      text,
      img: fileName,
    })

    res.json(news)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const updateNews = async (req, res, next) => {
  try {
    const {id, text, title} = req.body
    let update = false
    const result = await News.update({text, title}, {where: {id}})
    if (result[0] === 1) update = true

    res.status(200).json(update)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const deleteNews = async (req, res, next) => {
  try {
    const {id} = req.query
    const news = await News.findOne({where: {id}})

    //удаляем изображение новости
    if (news) fs.unlinkSync(path.resolve(path.resolve(), 'static', news.img))
    const result = await News.destroy({where: {id}})

    res.status(200).json(!!result)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getAllNews = async (req, res, next) => {
  try {
    let {limit, page} = req.query
    limit = limit || 10
    let offset = (page - 1) * limit

    const news = await News.findAndCountAll({
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    })

    res.status(200).json(news)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const getOneNews = async (req, res, next) => {
  try {
    let {id} = req.params
    const news = await News.findOne({where: {id}})

    res.status(200).json(news)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}
