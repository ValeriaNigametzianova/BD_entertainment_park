const ApiError = require('../error/ApiError')
const { Tarif, Park } = require('../models/models')

class tarifController {
  async create(req, res, next) {
    try {
      const { name, cost, description, ParkId } = req.body
      const tarif = await Tarif.create({ name, cost, description, ParkId })
      return res.status(200).json(tarif)
    } catch (e) {
      return next(ApiError.badRequest(e.massage))
    }
  }

  async getAll(req, res) {
    try {
      const { id } = req.params
      const park = await Park.findOne({ where: { id } })
      let tarif = await Tarif.findAll({ where: { parkId: park.id } })
      return res.status(200).json(tarif)
    } catch (error) {
      return res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return next(ApiError.badRequest('Такого тарифа не существует'))
      }
      const tarif = await Tarif.findOne({
        where: { id },
      })
      return res.status(200).json({ tarif })
    } catch (error) {
      return res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }

  async update(req, res) {
    try {
      let tarif = req.body
      if (!tarif.id) {
        return res.json(ApiError.badRequest({ message: 'Id не указан' }))
      }
      await Tarif.update(tarif, {
        where: {
          id: tarif.id,
        },
      })
      let updatedTarif = await Tarif.findByPk(tarif.id)
      return res.status(200).json(updatedTarif)
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
      const tarif = await Tarif.findOne({ where: { id } })
      if (!tarif) {
        return res.json(ApiError.badRequest({ message: 'Тариф не найден' }))
      }
      await Tarif.destroy({ where: { id } })
      return res.status(200).status(200).json(tarif)
    } catch (e) {
      return res.json(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }
}

module.exports = new tarifController()
