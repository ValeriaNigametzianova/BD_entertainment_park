const ApiError = require('../error/ApiError') 
const {Park} = require("../models/models")

class parkController{
    async create (req, res){
        try{
            const {name,town} = req.body
            const park = await Park.create({name, town})
            return res.json(park)
        } catch(e){
            next(ApiError.badRequest(e.massage))
        }

    }
    async getAll (req, res, limit, page){
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let parks = await Park.findAndCountAll({limit, offset}) //пагинация, выдает кол-во всех полей и записи с указанным лимитом
        return res.json(parks)
    }
    async getOne (req, res){
        const {id} = req.params
        const park = await Park.findOne(
            {where: {id}},
            include: [{}]
        )
    }
}

module.exports = new parkController()