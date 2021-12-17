import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import ApiError from '../error/ApiError.js'
import {User, Role} from '../models/models.js'
dotenv.config()

//функция для создания токена
const jwtCreate = (id, login, role) =>
  //создаём jwt токен 1й парметр payload: {id: user.id, email, role} для считывание на frontend
  //2й параметр секртеный ключ, 3й параметр время жизни токена
  jwt.sign({id, login, role}, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const login = async (req, res, next) => {
  try {
    const {login, password} = req.body

    //ищем пользователя, если нет выводим сообщение что такого нет
    const user = await User.findOne({
      where: {login},
      include: [{model: Role, attributes: ['type']}],
    })
    if (!user) {
      return next(ApiError.badRequest('Пользователь с таким именем не найден'))
    }

    //если есть пользователь, сравниваем пароли, не совпали Неверный пароль
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль'))
    }

    //всё совпало генерируем токен и возвращаем на frontend
    const jwtToken = jwtCreate(user.id, user.login, user.role.type)

    res.json({token: jwtToken})
  } catch (error) {
    next(ApiError.internal(error.message))
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 */
export const check = async (req, res) => {
  //до этого проверили на валидность, если прошёл прошлую authMiddleware
  //то создаём новый токен и передаём на frontEnd
  const token = jwtCreate(req.user.id, req.user.login, req.user.role)
  res.json({token})
}
