const ApiError = require('../error/ApiError')
const { GreenZone } = require('../models/models')

class greenZoneController {
  async create(req, res, next) {
    try {
      const { name, description, id } = req.body
      const greenZone = await GreenZone.create({
        name,
        description,
        ParkId: id,
      })
      return res.json(greenZone)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.params
      let greenZone = await GreenZone.findAll({ where: { ParkId: id } })
      return res.json(greenZone)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res, next) {
    try {
      let greenZone = req.body
      if (!greenZone.id) {
        next(ApiError.badRequest({ message: 'Id не указан' }))
      }
      await GreenZone.update(greenZone, {
        where: {
          id: greenZone.id,
        },
      })
      let updatedGreenZone = await GreenZone.findByPk(greenZone.id)
      return res.json(greenZone)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body
      if (!id) {
        next(ApiError.badRequest({ message: 'Id не указан' }))
      }
      const greenZone = await GreenZone.findOne({ where: { id } })
      if (!greenZone) {
        next(ApiError.badRequest({ message: 'Зона отдыха не найдена' }))
      }
      await GreenZone.destroy({ where: { id } })
      return res.status(200).json(greenZone)
    } catch (e) {
      res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }
}

module.exports = new greenZoneController()
