const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const { Stuff, Admin, Customer, Ticket } = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '6h',
  })
}

class CustomerController {
  async registration(req, res, next) {
    try {
      const { email, phone_number } = req.body
      const candidate = await Customer.findOne({ where: { email } })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email уже существует')
        )
      }
      const activationLink = uuid.v4()
      const customer = await Customer.create({ email, phone_number })
      const token = generateJwt(customer.id, customer.email, 'customer')
      return res.json({ token })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async login(req, res, next) {
    const { email } = req.body
    const customer = await Customer.findOne({ where: { email } })
    console.log(email)
    if (!customer) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    // let comparePassword = bcrypt.compareSync(password, customer.password)
    // if (!comparePassword){
    //     return next (ApiError.internal("Указан неверный пароль"))
    // }
    const token = generateJwt(customer.id, customer.email, 'customer')
    return res.json({ token })
  }

  async check(req, res) {
    const token = generateJwt(req.customer.id, req.customer.email, 'customer')
    return res.json({ token, customer: req.customer })
  }
}

module.exports = new CustomerController()
