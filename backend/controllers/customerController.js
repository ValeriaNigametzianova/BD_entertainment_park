const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const { Customer } = require('../models/models')

const generateJwt = (id, email, role, next) => {
  try {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: '6h',
    })
  } catch (error) {
    return next(ApiError.badRequest({ error: error }))
  }
}

class CustomerController {
  async registration(req, res, next) {
    try {
      const { email, phone_number } = req.body
      const candidate = await Customer.findOne({ where: { email } })
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }
      const activationLink = uuid.v4()
      const customer = await Customer.create({ email, phone_number })
      const token = generateJwt(customer.id, customer.email, 'customer')
      return res.status(200).json({ token })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async login(req, res, next) {
    try {
      const { email } = req.body
      const customer = await Customer.findOne({ where: { email } })
      console.log(email)
      if (!customer) {
        return next(ApiError.internal('Пользователь не найден'))
      }
      const token = generateJwt(customer.id, customer.email, 'customer')
      return res.status(200).json({ token })
    } catch (error) {
      return next(ApiError.badRequest({ error: error }))
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.customer.id, req.customer.email, 'customer')
      return res.status(200).json({ token, customer: req.customer })
    } catch (error) {
      return next(ApiError.badRequest({ error: error }))
    }
  }
}

module.exports = new CustomerController()
