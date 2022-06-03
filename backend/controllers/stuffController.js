const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  Stuff,
  Park,
  Admin,
  Customer,
  Ticket,
  Tarif,
  Attraction,
  GreenZone,
} = require('../models/models')

const generateJwt = (id, login) => {
  return jwt.sign({ id, login }, process.env.SECRET_KEY, {
    expiresIn: '6h',
  })
}

class StuffController {
  async registration(req, res, next) {
    const { login, password } = req.body
    if (!login || !password) {
      return next(ApiError.badRequest('Некорректные данные'))
    }
    const candidate = await Stuff.findOne({ where: { login } })
    if (candidate) {
      return next(
        ApiError.badRequest('Пользователь с таким email уже существует')
      )
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const stuff = await Stuff.create({ login, password: hashPassword })
    const admin = await Admin.create({ StuffId: stuff.id })
    console.log(stuff.id, admin)
    //выводить все билеты, у чела -корзина
    const token = generateJwt(stuff.id, stuff.login)
    return res.json({ token })
  }

  async login(req, res, next) {
    const { login, password } = req.body
    const stuff = await Stuff.findOne({ where: { login } })
    if (!stuff) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, stuff.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(stuff.id, stuff.login)
    return res.json({ token })
  }

  async check(req, res, next) {
    const token = generateJwt(req.stuff.id, req.stuff.login)
    return res.json({ token })
  }

  async getPark(req, res, next) {
    const { id } = req.stuff
    Stuff.findOne({ where: id }).then((stuff) => {
      console.log(stuff)
      if (!stuff) return
      stuff.getParks().then(async (parks) => {
        console.log('parks.id', parks.id)
        // const greenZone = await GreenZone.findAll({
        //   where: { ParkId: parks.id },
        // })
        return res.json({ parks })
      })
    })
  }

  async getTarif(req, res, next) {
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
        return res.json({ tarifs })
      })
    })
  }

  async getAttraction(req, res, next) {
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
        return res.json({ attractions })
      })
    })
  }

  async getGreenZone(req, res, next) {
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
            // greenZones.push(greenZone)
            parks.push({ park: el, greenZones: greenZone })
          })
        )
        return res.json({ parks })
      })
    })
  }
}

module.exports = new StuffController()
