const ApiError = require('../error/ApiError') 
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {Stuff, Admin, Customer, Park, Ticket} = require("../models/models")
const { park } = require('./stuffController')

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY, 
        {expiresIn: "6h"}
    )
}

class AdminController{
    async create (req, res, next){
        const {login} = req.body
        const stuff = await Stuff.findOne({where: {login}})
        const admin = await Admin.create({StuffId: stuff.id})
        return res.json(admin)
    }

    async hasPark (park, stuff){
            if(!stuff) return;
            if(!park) return;
            stuff.addPark(park, {through:{}});
    }

    async getAll (req, res){
        let admin = await Admin.findAll() 
        return res.json(admin)
    }
    
    // async check (req, res){
    //     const token = generateJwt(req.customer.id, req.customer.email)
    //     return res.json({token})   
    // }
}

module.exports = new AdminController()