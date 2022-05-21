const ApiError = require('../error/ApiError') 
const {Attraction, Park} = require("../models/models")

class attraсtionController{
    async create (req, res){
        try{
            const {name,age_limitation, parkId} = req.body
            const attraсtion = await Attraction.create({name, age_limitation, parkId})
            return res.json(attraсtion)
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
        let attraсtion = await Attraction.findAll({parkId: park.id}) 
        return res.json(attraсtion)
    }
}

module.exports = new attraсtionController()