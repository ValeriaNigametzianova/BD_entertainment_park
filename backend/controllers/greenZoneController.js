const ApiError = require('../error/ApiError')
const { Attraction, Park, GreenZone } = require('../models/models')

class greenZoneController {
  async create(req, res, next) {
    try {
      const { name, description, ParkId } = req.body
      const greenZone = await GreenZone.create({
        name,
        description,
        ParkId,
      })
      return res.json(greenZone)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    const { id } = req.params
    let greenZone = await GreenZone.findAll({ where: { ParkId: id } })
    return res.json(greenZone)
  }

  async update(req, res) {
    let greenZone = req.body
    if (!greenZone.id) {
      return res.json(ApiError.badRequest({ message: 'Id не указан' }))
    }
    await GreenZone.update(greenZone, {
      where: {
        id: greenZone.id,
      },
    })
    let updatedGreenZone = await GreenZone.findByPk(greenZone.id)
    return res.json(updatedGreenZone)
  }

  async delete(req, res) {
    try {
      const { id } = req.body
      if (!id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      const greenZone = await GreenZone.findOne({ where: { id } })
      if (!greenZone) {
        return res.json(
          ApiError.badRequest({ message: 'Зона отдыха не найдена' })
        )
      }
      await GreenZone.destroy({ where: { id } })

      return res.status(200).json(greenZone)
    } catch (e) {
      res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }
}

module.exports = new greenZoneController()
