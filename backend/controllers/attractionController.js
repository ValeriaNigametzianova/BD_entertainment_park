const ApiError = require('../error/ApiError') 
const {Attraction, Park} = require("../models/models")

class attrationController{
    async create (req, res){
        try{
            const {name,age_limitation} = req.body
            const attration = await Attraction.create({name, age_limitation})
            return res.json(attration)
        } catch(e){
            next(ApiError.badRequest(e.massage))
        }

    }
    async getAll (req, res){
        const {id} = req.params
        const park = await Park.findOne({where: {id}})
        // let  {limit, page} = req.query   //пагинация, выдает кол-во всех полей и записи с указанным лимитом
        // page = page || 1
        // limit = limit || 10
        // let offset = page * limit - limit
        let attration = await Attraction.findAll({parkId: park.id}) 
        return res.json(attration)
    }
}

module.exports = new attrationController()