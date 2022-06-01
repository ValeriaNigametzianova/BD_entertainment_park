const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Stuff, Admin, Customer, Park, Ticket } = require('../models/models')
const { park } = require('./stuffController')

class AdminController {
  async create(req, res, next) {
    const { login } = req.body
    const stuff = await Stuff.findOne({ where: { login } })
    const admin = await Admin.create({ StuffId: stuff.id })
    return res.json(admin)
  }

  async hasPark(park, stuff) {
    if (!stuff) return
    if (!park) return
    const id = park.id
    await Admin.update({ ParkId: id }, { where: { StuffId: stuff.id } })
  }

  async getAll(req, res) {
    let admin = await Admin.findAll()
    return res.json(admin)
  }

  // async get_role (stuff){
  //     if(!stuff) return;
  //     await Admin.update({role: "admin"}, {where:{StuffId: stuff.id}});
  // }
}

module.exports = new AdminController()
