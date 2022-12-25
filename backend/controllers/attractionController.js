const e = require('express')
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
      if (!ParkId) next(ApiError.badRequest('Вы не можете создать аттракцион вне парка'))
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
      return res.json({ attraсtion, message: 'Аттракцион успешно создан' })
    } catch (e) {
      next(ApiError.internal('Заполните все обязательные поля'))
    }
  }
  async getAll(req, res, next) {
    try {
      const { id } = req.params
      let attraсtion = await Attraction.findAll({ where: { ParkId: id } })
      return res.status(200).json(attraсtion)
    } catch (error) {
      next(ApiError.internal({ message: error.message }))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest('Такого аттракциона не существует'))
      }
      const attraсtion = await Attraction.findOne({
        where: { id },
      })
      return res.status(200).json({ attraсtion })
    } catch (error) {
      next(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async update(req, res, next) {
    try {
      let attraсtion = req.body
      if (!attraсtion.id) {
        next(ApiError.badRequest({ message: 'Id не указан' }))
      }
      await Attraction.update(attraсtion, {
        where: {
          id: attraсtion.id,
        },
      })
      let updatedAttraction = await Attraction.findByPk(attraсtion.id)
      return res.status(200).json({ updatedAttraction, message: 'Данные об аттракционе успешно обновлены' })
    } catch (error) {
      next(ApiError.internal({ message: error.message }))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      if (!id) {
        next(ApiError.badRequest({ message: 'Id не указан' }))
      }
      const attraсtion = await Attraction.findOne({ where: { id } })
      if (!attraсtion) {
        next(ApiError.badRequest({ message: 'Аттракцион не найден' }))
      }
      await Attraction.destroy({ where: { id } })

      return res.status(200).json({ attraсtion, message: 'Аттракцион был удален' })
    } catch (e) {
      res.json(ApiError.internal({ message: error.message }))
    }
  }
}

module.exports = new attraсtionController()
