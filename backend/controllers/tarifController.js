const ApiError = require('../error/ApiError')
const { Tarif, Park } = require('../models/models')

class tarifController {
  async create(req, res, next) {
    try {
      const { name, cost, description, ParkId } = req.body
      if (!ParkId) next(ApiError.internal('Вы не можете создать тариф вне парка'))
      const tarif = await Tarif.create({ name, cost, description, ParkId })
      return res.json({ tarif, message: 'Тариф успешно создан' })
    } catch (e) {
      next(ApiError.badRequest('Заполните все обязательные поля'))
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.params
      const park = await Park.findOne({ where: { id } })
      let tarif = await Tarif.findAll({ where: { parkId: park.id } })
      console.log(tarif)
      return res.status(200).json(tarif)
    } catch (error) {
      return next(ApiError.internal('Ошибка сервера'))
    }
  }

  async getOne(req, res, next) {
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
      next(ApiError.internal('Ошибка сервера'))
    }
  }

  async update(req, res, next) {
    try {
      let tarif = req.body
      if (!tarif.id) {
        next(ApiError.badRequest('Id не указан'))
      }
      await Tarif.update(tarif, {
        where: {
          id: tarif.id,
        },
      })
      let updatedTarif = await Tarif.findByPk(tarif.id)
      return res.status(200).json({ updatedTarif, message: 'Данные тарифа успешно обновлены' })
    } catch (error) {
      next(res.json(ApiError.internal({ message: 'Ошибка сервера' })))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      if (!id) {
        next(ApiError.badRequest({ message: 'Id не указан' }))
      }
      const tarif = await Tarif.findOne({ where: { id } })
      if (!tarif) {
        next(ApiError.badRequest({ message: 'Тариф не найден' }))
      }
      await Tarif.destroy({ where: { id } })
      return res.status(200).json({ tarif, message: 'Тариф был удален' })
    } catch (e) {
      next(ApiError.internal({ message: 'Ошибка сервера' }))
    }
  }
}

module.exports = new tarifController()
