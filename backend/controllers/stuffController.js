const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Stuff, Tarif, Attraction, GreenZone } = require('../models/models')

const generateJwt = (id, login, role, next) => {
  try {
    return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
      expiresIn: '6h',
    })
  } catch (error) {
    return next(ApiError.badRequest({ error: error }))
  }
}

class StuffController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body
      if (!login || !password) {
        return next(ApiError.badRequest('Некорректные данные'))
      }
      const candidate = await Stuff.findOne({ where: { login } })
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const stuff = await Stuff.create({ login, password: hashPassword })
      const token = generateJwt(stuff.id, stuff.login, 'stuff')
      return res.status(200).json({ token })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body
      const stuff = await Stuff.findOne({ where: { login } })
      if (!stuff) {
        return next(ApiError.internal('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, stuff.password)
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(stuff.id, stuff.login, 'stuff')
      return res.status(200).json({ token })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.stuff.id, req.stuff.login, 'stuff')
      return res.status(200).json({ token, stuff: req.stuff })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async getPark(req, res, next) {
    try {
      const { id } = req.stuff
      Stuff.findOne({ where: id }).then((stuff) => {
        if (!stuff) return
        stuff.getParks().then(async (parks) => {
          return res.status(200).json({ parks })
        })
      })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async getTarif(req, res, next) {
    try {
      const { id } = req.stuff
      Stuff.findOne({ where: { id } }).then((stuff) => {
        if (!stuff) return
        let tarifs = []
        stuff.getParks().then(async (parks) => {
          await Promise.all(
            parks.map(async (el) => {
              const tarif = await Tarif.findAll({ where: { ParkId: el?.id } })
              tarifs.push(tarif)
            })
          )
          return res.status(200).json({ tarifs })
        })
      })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async getAttraction(req, res, next) {
    try {
      const { id } = req.stuff
      Stuff.findOne({ where: { id } }).then((stuff) => {
        if (!stuff) return
        let attractions = []
        stuff.getParks().then(async (parks) => {
          await Promise.all(
            parks.map(async (el) => {
              const attraction = await Attraction.findAll({
                where: { ParkId: el?.id },
              })
              attractions.push(attraction)
            })
          )
          return res.status(200).json({ attractions })
        })
      })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }

  async getGreenZone(req, res, next) {
    try {
      const { id } = req.stuff
      Stuff.findOne({ where: { id } }).then((stuff) => {
        if (!stuff) return
        let parks = []
        stuff.getParks().then(async (_parks) => {
          await Promise.all(
            _parks.map(async (el) => {
              const greenZone = await GreenZone.findAll({
                where: { ParkId: el?.id },
              })
              parks.push({ park: el, greenZones: greenZone })
            })
          )
          return res.status(200).json({ parks })
        })
      })
    } catch (e) {
      return next(ApiError.badRequest({ error: e }))
    }
  }
}

module.exports = new StuffController()
