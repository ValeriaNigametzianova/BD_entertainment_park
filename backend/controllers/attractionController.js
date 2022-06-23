const ApiError = require('../error/ApiError')
const { Attraction, Park } = require('../models/models')

class attraсtionController {
  async create(req, res, next) {
    try {
      let {
        name,
        hight,
        weight_limitation,
        hight_limitation,
        description,
        age_limitation,
        max_quantity_people,
        active,
        ParkId,
      } = req.body
      const attraсtion = await Attraction.create({
        name,
        hight,
        weight_limitation,
        hight_limitation,
        description,
        age_limitation,
        max_quantity_people,
        active,
        ParkId,
      })
      return res.json(attraсtion)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    try {
      const { id } = req.params
      let attraсtion = await Attraction.findAll({ where: { ParkId: id } })
      return res.status(200).json(attraсtion)
    } catch (error) {
      return res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest('Такого парка не существует'))
      }
      const attraсtion = await Attraction.findOne({
        where: { id },
      })
      return res.status(200).json(attraсtion)
    } catch (error) {
      return res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async update(req, res) {
    try {
      let attraсtion = req.body
      if (!attraсtion.id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      await Attraction.update(attraсtion, {
        where: {
          id: attraсtion.id,
        },
      })
      let updatedAttraction = await Attraction.findByPk(attraсtion.id)
      return res.status(200).json(updatedAttraction)
    } catch (error) {
      return res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      const attraсtion = await Attraction.findOne({ where: { id } })
      if (!attraсtion) {
        return res.json(
          ApiError.badRequest({ message: 'Аттракцион не найден' })
        )
      }
      await Attraction.destroy({ where: { id } })

      return res.status(200).json(attraсtion)
    } catch (e) {
      res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }
}

module.exports = new attraсtionController()
