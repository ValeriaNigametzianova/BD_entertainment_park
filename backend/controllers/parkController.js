const ApiError = require('../error/ApiError') 
const {Park, Attraction, Stuff} = require("../models/models")
const adminController = require('./adminController')

class parkController{
    async create (req, res, next){
        try{
            const {name, town, opening_time, closing_time,description, adress} = req.body
            const park = await Park.create({name, town, opening_time, closing_time,description, adress})
            const stuff = await Stuff.findOne({where: {id: req.stuff.id}})
            const admin = adminController.hasPark(park,stuff)
            console.log(req.stuff.login, stuff)
            return res.json(park)
        } catch(e){
            next(ApiError.badRequest(e.message))
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
    
    async update (req, res){
        const park = req.body
        if (!park.id){
            res.json(ApiError.badRequest({message:"Id не указан"}))
        }
        const updatePark = await Attraction.findByIdAndUpdate(park.id,park,{new:true})
        return res.json(updatePark)
    }

    async delete(req,res){
        try{
            const {id}=req.params
            if(!id){
                res.json(ApiError.badRequest({message: "Id не указан"}))
            }
            const park = await Park.findByIdAndDelete(id)
            return res.json(park)
        }catch(e){
            res.json(ApiError.internal({message: "Ошибка сервера"}))
        }
    }
}

module.exports = new parkController()