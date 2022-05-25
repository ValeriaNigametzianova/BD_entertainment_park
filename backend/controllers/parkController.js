const ApiError = require('../error/ApiError') 
const {Park, Attraction, Stuff, Admin} = require("../models/models")
const adminController = require('./adminController')


class parkController{
    async create (req, res, next){
        try{
            const {name, town, square, opening_time, closing_time, description,  animators, watersafe, zoo, cafe, shops, adress} = req.body
            const park = await Park.create({name, town, square, opening_time, closing_time, description,  animators, watersafe, zoo, cafe, shops, adress})
            console.log(req.stuff.id)
            const stuff = await Stuff.findOne({where: {id: req.stuff.id}})
            console.log(stuff)
            const admin = adminController.hasPark(park,stuff)
            console.log(admin)
            return res.json(park)
        } catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res, next){
        let  {town, limit, page} = req.query
        console.log(req.query);
        limit = Number(limit)
        page = Number(page)
        page = page || 1
        limit = limit || 5
        console.log(limit);
        let offset = page * limit - limit
        let parks
        if (town){
            parks = await Park.findAndCountAll({ offset, limit, where: {town}}) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
            return res.json(parks)
        }
        if(!town){
            parks = await Park.findAndCountAll({offset, limit}) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
            return res.json(parks)
    }
}

    async getOne (req, res){
        const {id} = req.params
        if (!id){
            return next(ApiError.badRequest("Такого парка не существует"))
        }
        console.log(id);
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
        await Park.update(park,{
            where: {
              id: park.id
            }
        })
        let updatedPark = await Park.findByPk(park.id);
        return res.json(updatedPark)
    }

    async delete(req,res){
        try{
            const {id}=req.body
            if(!id){
                return res.json(ApiError.badRequest({message: "Id не указан"}))
            }
            const park = await Park.findOne({where: {id}})
            if (!park){
                return res.json(ApiError.badRequest({message:"Парк не найден"}))
            }
            await Park.destroy({where: {id}})

            return res.status(200).json(park)
        }catch(e){
            res.json(ApiError.internal({message: e}))
        }
    }
}

module.exports = new parkController()