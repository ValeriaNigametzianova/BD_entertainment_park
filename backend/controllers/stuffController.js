const ApiError = require('../error/ApiError') 
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {Stuff, Park, Admin, Customer, Ticket} = require("../models/models")

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY, 
        {expiresIn: "6h"}
    )
}

class StuffController{
    async registration (req, res, next){
        const {login, password} = req.body
        if(!login || !password){
            return next(ApiError.badRequest("Некорректные данные"))
        }
        const candidate = await Stuff.findOne({where:{login}})
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const stuff = await Stuff.create({login, password: hashPassword})
        //выводить все билеты, у чела -корзина
        const token = generateJwt(stuff.id, stuff.login)
        return res.json({token})
    }

    async login (req, res, next){
        const {login, password} = req.body
        const stuff = await Stuff.findOne({where: {login}})
        if (!stuff){
            return next (ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, stuff.password)
        if (!comparePassword){
            return next (ApiError.internal("Указан неверный пароль"))
        }
        const token = generateJwt(stuff.id, stuff.login)
        return res.json({token})
    }
    
    async check (req, res, next){
        const token = generateJwt(req.stuff.id, req.stuff.login)
        return res.json({token})   
    }

    async park (req, res, next){
        const stuff = await Stuff.findOne({where: {login}})
        const parks = await Park.findAll({stuffId: stuff.id}) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
        return res.json(parks)
    }
}

module.exports = new StuffController()