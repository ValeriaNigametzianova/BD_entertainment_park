const ApiError = require('../error/ApiError') 
const {Park, Attraction} = require("../models/models")

class parkController{
    async create (req, res){
        try{
            const {name,town, attractions} = req.body
            const park = await Park.create({name, town})

            if (attractions){
                attractions = JSON.parse(info)
                attractions.forEach(i => 
                    Attraction.create({
                    name: i.name,
                    parkId: park.id
                    })
                )
            }

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
        const park = await Park.findOne(
            {
                where: {id},
                include: [{model: Attraction, as: "attractions"}]
            },
        )
        return res.json(park)
    }
}

module.exports = new parkController()