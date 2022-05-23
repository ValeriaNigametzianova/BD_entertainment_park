const ApiError = require('../error/ApiError') 
const {Tarif, Park} = require("../models/models")

class tarifController{
    async create (req, res){
        try{
            const {name, cost, description, parkId} = req.body
            const tarif = await Tarif.create({name, cost, description, parkId})
            return res.json(tarif)
        } catch(e){
            next(ApiError.badRequest(e.massage))
        }

    }
    async getAll (req, res){
        const {id} = req.param
        const park = await Park.findOne({where: {id}})
        // let  {limit, page} = req.query   //пагинация, выдает кол-во всех полей и записи с указанным лимитом
        // page = page || 1
        // limit = limit || 10
        // let offset = page * limit - limit
        let tarif = await Tarif.findAll({parkId: park.id}) 
        return res.json(tarif)
    }

    async update (req, res){
        const tarif = req.body
        if (!tarif.id){
            res.json(ApiError.badRequest({message:"Id не указан"}))
        }
        const updateTarif = await Tarif.findByIdAndUpdate(tarif.id,tarif,{new:true})
        return res.json(updateTarif)
    }

    async delete(req,res){
        try{
            const {id}=req.params
            if(!id){
                res.json(ApiError.badRequest({message: "Id не указан"}))
            }
            const tarif = await Tarif.findByIdAndDelete(id)
            return res.json(tarif)
        }catch(e){
            res.json(ApiError.internal({message: "Ошибка сервера"}))
        }
    }
}

module.exports = new tarifController()