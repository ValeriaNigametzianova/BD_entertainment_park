const path = require('path')
const sequelize = require('sequelize')
const ApiError = require('../error/ApiError')
const multer = require('multer')
const { Park, Attraction, Stuff, GreenZone } = require('../models/models')
const fs = require('fs')

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
      await stuff.setParks(park)
      return res.status(200).json({ park, message: 'Парк развлечений успешно создан' })
    } catch (e) {
      return res.json(ApiError.internal({ message: e.message }))
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
            [sequelize.Op.and]: [{ town }, { name: { [sequelize.Op.like]: '%' + name + '%' } }],
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
    // const { file } = req.files
    try {
      const {
        id,
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
      const park = {
        id: id,
        name: name,
        town: town,
        square: square,
        opening_time: opening_time,
        closing_time: closing_time,
        description: description,
        animators: animators,
        watersafe: watersafe,
        zoo: zoo,
        cafe: cafe,
        shops: shops,
        adress: adress,
      }
      if (!park.id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      await Park.update(park, {
        where: {
          id: park.id,
        },
      })
      let updatedPark = await Park.findByPk(park.id)
      return res.status(200).json({ updatedPark, message: 'Данные о парке успешно изменены' })
    } catch (e) {
      return res.json(ApiError.internal({ message: e.message }))
    }
  }

  async setPhoto(req, res) {
    try {
      const { file } = req.files
      const { id } = req.body
      const type = file.name.split('.').pop()
      let fileName = `${id}.jpg`
      file.mv(path.resolve(__dirname, '..', '..', 'ParkPhotos', fileName))
    } catch (e) {
      return res.json(ApiError.internal({ message: e }))
    }
  }

  async deletePhoto(req, res) {
    try {
      const { fileName } = req.params
      fs.access(path.resolve(__dirname, '..', '..', 'ParkPhotos', fileName), (err) => {
        if (!err) {
          return res.json(ApiError.internal({ message: 'Такого файла не существует' }))
        }
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'ParkPhotos', fileName))
        return res.status(200).json(ApiError.badRequest({ message: 'Файл удален' }))
      })
    } catch (e) {
      return res.json(ApiError.internal({ message: e }))
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
      return res.status(200).json({ park, message: 'Парк развлечений был удален' })
    } catch (e) {
      return res.json(ApiError.internal({ message: e.message }))
    }
  }
}

module.exports = new parkController()
