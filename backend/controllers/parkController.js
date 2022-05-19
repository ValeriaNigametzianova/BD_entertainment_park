const ApiError = require('../error/ApiError') 
const {Park} = require("../models/models")

class parkController{
    async create (req, res){
        const {name,town} = req.body
        const park = await Park.create({name, town})
        return res.json(park)

    }
    async getAll (req, res){
        const parks = await Park.findAll()
        return res.json(parks)
    }
    async getOne (req, res){
        
    }
}

module.exports = new parkController()