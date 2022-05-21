const ApiError = require('../error/ApiError') 
const {Park, Attraction} = require("../models/models")

class parkController{
    async create (req, res, next){
        try{
            const {name, town, opening_time, closing_time,description, adress} = req.body
            const park = await Park.create({name, town, opening_time, closing_time,description, adress})
            return res.json(park)
        } catch(e){
            next(ApiError.badRequest(e.massage))
        }
    }

    async getAll (req, res){
        let  {limit, page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let parks = await Park.findAndCountAll({limit, offset}) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
        return res.json(parks)
    }

    async getOne (req, res){
        const {id} = req.params
        if (!id){
            return next(ApiError.badRequest("Такого парка не существует"))
        }
        const park = await Park.findOne(
            {
                where: {id},
                attributes:["name","description"]
                // include: [{model: Park, as: "name", as: "description"}]
            },
        )
        return res.json(park)
    }

    async getAttraction(req, res){
        const {id} = req.params
        const park = await Park.findOne(
            {
                where: {id, },
                include: [{model: Attraction, as: "attraction"}]
            },
        )
        return res.json(park)
    }

    async getDescription(req, res){
        const {id} = req.params
        const park = await Park.findOne(
            {
                where: {id},
                attributes:["opening_time", "closing_time", "adress"]
                // include: [{model: Park, as: "opening_time", as: "closing_time", as: "cafe", as: "shops"}]
            },
        )
        return res.json(park)
    }
}

module.exports = new parkController()