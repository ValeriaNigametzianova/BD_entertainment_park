const sequelize = require('sequelize')
const ApiError = require('../error/ApiError')
const {
  Park,
  Attraction,
  Stuff,
  Admin,
  GreenZone,
} = require('../models/models')
const adminController = require('./adminController')

class parkController {
  async create(req, res, next) {
    try {
      const {
        name,
        town,
        square,
        opening_time,
        closing_time,
        description,
        animators,
        watersafe,
        zoo,
        cafe,
        shops,
        adress,
      } = req.body
      const park = await Park.create({
        name,
        town,
        square,
        opening_time,
        closing_time,
        description,
        animators,
        watersafe,
        zoo,
        cafe,
        shops,
        adress,
      })
      const stuff = await Stuff.findOne({ where: { id: req.stuff.id } })
      // const admin = await Admin.create({ StuffId: stuff.id, ParkId: park.id })
      await stuff.setParks(park)
      return res.json(park)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    let parks = await Park.findAll()
    let { name, town, limit, page } = req.query
    // const names = [...new Set(parks.map((el) => el.name))]
    const towns = [...new Set(parks.map((el) => el.town))]
    console.log('req.query', req.query)
    limit = Number(limit)
    page = Number(page)
    page = page || 1
    limit = limit || 5
    console.log(limit)
    let offset = page * limit - limit
    console.log('town:', town)
    if (name && town) {
      parks = await Park.findAndCountAll({
        offset,
        limit,
        where: {
          [sequelize.Op.and]: [
            { town },
            { name: { [sequelize.Op.like]: '%' + name + '%' } },
          ],
        },
      }) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
      return res.json({ parks, towns })
    }
    if (!name && town) {
      parks = await Park.findAndCountAll({
        offset,
        limit,
        where: { town },
      }) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
      return res.json({ parks, towns })
    }
    if (name && !town) {
      parks = await Park.findAndCountAll({
        offset,
        limit,
        where: {
          name: { [sequelize.Op.like]: '%' + name + '%' },
        },
      }) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
      return res.json({ parks, towns })
    }
    if (!name && !town) {
      parks = await Park.findAndCountAll({ offset, limit }) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
      return res.json({ parks, towns })
    }
  }

  async getOne(req, res) {
    const { id } = req.params
    if (!id) {
      return next(ApiError.badRequest('Такого парка не существует'))
    }
    console.log(id)
    const park = await Park.findOne({
      where: { id },
      // attributes:["name","description","town"]
      // include: [{model: Park, as: "name", as: "description"}]
    })
    const greenZone = await GreenZone.findAll({
      where: { ParkId: id },
    })
    console.log(greenZone)
    return res.json({ park, greenZone })
  }

  async getAttraction(req, res) {
    const { id } = req.params
    const park = await Park.findOne({
      where: { id },
      include: [{ model: Attraction, as: 'attraction' }],
    })
    return res.json(park)
  }

  async getDescription(req, res) {
    const { id } = req.params
    const park = await Park.findOne({
      where: { id },
      attributes: ['opening_time', 'closing_time', 'adress'],
      // include: [{model: Park, as: "opening_time", as: "closing_time", as: "cafe", as: "shops"}]
    })
    return res.json(park)
  }

  async update(req, res) {
    try {
      console.log(req.body)
      const park = req.body
      if (!park.id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      await Park.update(park, {
        where: {
          id: park.id,
        },
      })
      let updatedPark = await Park.findByPk(park.id)
      return res.json(updatedPark)
    } catch (e) {
      return res.json(ApiError.internal({ message: e.message }))
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      console.log('park00000', id)
      if (!id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      const park = await Park.findOne({ where: { id } })
      if (!park) {
        return res.json(ApiError.badRequest({ message: 'Парк не найден' }))
      }
      await Park.destroy({ where: { id: park.id } })

      return res.status(200).json(park)
    } catch (e) {
      return res.json(ApiError.internal({ message: e }))
    }
  }
}

module.exports = new parkController()
