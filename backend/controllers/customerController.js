const ApiError = require('../error/ApiError') 
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {Stuff, Admin, Customer, Ticket} = require("../models/models")

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY, 
        {expiresIn: "6h"}
    )
}

class CustomerController{
    async registration (req, res, next){
        const {email, phone_number} = req.body
        const candidate = await Customer.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const customer = await Customer.create({email, phone_number})
        //выводить все билеты, у чела -корзина
        const token = generateJwt(customer.id, customer.email, customer.phone_number)
        return res.json({token})
    }

    async login (req, res, next){
        const {email} = req.body
        const customer = await Customer.findOne({where: {email}})
        if (!customer){
            return next (ApiError.internal("Пользователь не найден"))
        }
        // let comparePassword = bcrypt.compareSync(password, customer.password)
        // if (!comparePassword){
        //     return next (ApiError.internal("Указан неверный пароль"))
        // }
        const token = generateJwt(customer.id, customer.email)
        return res.json({token})
    }
    
    async check (req, res){
        const token = generateJwt(req.customer.id, req.customer.email)
        return res.json({token})   
    }
}

module.exports = new CustomerController()