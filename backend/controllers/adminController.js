const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Stuff, Admin, Customer, Park, Ticket } = require('../models/models')
const { park } = require('./stuffController')

class AdminController {
  async create(req, res, next) {
    try {
      const { login } = req.body
      const stuff = await Stuff.findOne({ where: { login } })
      const admin = await Admin.create({ StuffId: stuff.id })
      return res.status(200).json(admin)
    } catch (error) {
      res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async hasPark(park, stuff) {
    try {
      if (!stuff) return
      if (!park) return
      const id = park.id
      const admin = await Admin.update(
        { ParkId: id },
        { where: { StuffId: stuff.id } }
      )
    } catch (error) {
      return new Error(error.message)
    }
  }

  async getAll(req, res) {
    try {
      let admin = await Admin.findAll()
      return res.status(200).json(admin)
    } catch (error) {
      return new Error(error.message)
    }
  }

  // async get_role (stuff){
  //     if(!stuff) return;
  //     await Admin.update({role: "admin"}, {where:{StuffId: stuff.id}});
  // }
}

module.exports = new AdminController()
