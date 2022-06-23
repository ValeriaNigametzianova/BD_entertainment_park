const path = require('path')
const sequelize = require('sequelize')
const ApiError = require('../error/ApiError')
const {
  Park,
  Attraction,
  Stuff,
  Admin,
  GreenZone,
} = require('../models/models')

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
      const { img } = req.files
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
      await stuff.setParks(park)
      let fileName = `${park.id}.jpg`
      img.mv(path.resolve(__dirname, '..', 'PDFTickets', fileName))
      return res.status(200).json(park)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let parks = await Park.findAll()
      let { name, town, limit, page } = req.query
      const towns = [...new Set(parks.map((el) => el.town))]
      limit = Number(limit)
      page = Number(page)
      page = page || 1
      limit = limit || 5
      let offset = page * limit - limit
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
        })
        return res.status(200).json({ parks, towns })
      }
      if (!name && town) {
        parks = await Park.findAndCountAll({
          offset,
          limit,
          where: { town },
        })
        return res.status(200).json({ parks, towns })
      }
      if (name && !town) {
        parks = await Park.findAndCountAll({
          offset,
          limit,
          where: {
            name: { [sequelize.Op.like]: '%' + name + '%' },
          },
        })
        return res.status(200).json({ parks, towns })
      }
      if (!name && !town) {
        parks = await Park.findAndCountAll({ offset, limit })
        return res.status(200).json({ parks, towns })
      }
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest('Такого парка не существует'))
      }
      const park = await Park.findOne({
        where: { id },
      })
      const greenZone = await GreenZone.findAll({
        where: { ParkId: id },
      })
      return res.status(200).json({ park, greenZone })
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async getAttraction(req, res) {
    try {
      const { id } = req.params
      const park = await Park.findOne({
        where: { id },
        include: [{ model: Attraction, as: 'attraction' }],
      })
      return res.status(200).json(park)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async getDescription(req, res) {
    try {
      const { id } = req.params
      const park = await Park.findOne({
        where: { id },
        attributes: ['opening_time', 'closing_time', 'adress'],
      })
      return res.status(200).json(park)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res) {
    try {
      const { img } = req.files
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
      let fileName = `${park.id}.jpg`
      img.mv(path.resolve(__dirname, '../..', 'PDFTickets', fileName))
      return res.status(200).json(updatedPark)
    } catch (e) {
      return res.json(ApiError.internal({ message: e.message }))
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
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
