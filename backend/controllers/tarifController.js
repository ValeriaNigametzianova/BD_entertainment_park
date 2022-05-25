const ApiError = require('../error/ApiError') 
const {Tarif, Park} = require("../models/models")

class tarifController{
    async create (req, res,next){
        try{
            const {name, cost, description, ParkId} = req.body
            const tarif = await Tarif.create({name, cost, description, ParkId})
            return res.json(tarif)
        } catch(e){
            next(ApiError.badRequest(e.massage))
        }

    }
    async getAll (req, res){
        const {id} = req.params
        console.log(req.params);
        const park = await Park.findOne({where: {id}})
        // let  {limit, page} = req.query   //пагинация, выдает кол-во всех полей и записи с указанным лимитом
        // page = page || 1
        // limit = limit || 10
        // let offset = page * limit - limit
        console.log(park);
        let tarif = await Tarif.findAll({where: {parkId: park.id}}) 
        return res.json(tarif)
    }

    async update (req, res){
        let tarif = req.body
        if (!tarif.id){
            return  res.json(ApiError.badRequest({message:"Id не указан"}))
        }
        await Tarif.update(tarif,{
            where: {
              id: tarif.id
            }
        })
        let updatedTarif = await Tarif.findByPk(tarif.id);
        return res.json(updatedTarif)
    }

    async delete(req,res){
        try{
            const {id}=req.body
            if(!id){
                return res.json(ApiError.badRequest({message: "Id не указан"}))
            }
            const tarif = await Tarif.findOne({where: {id}})
            if (!tarif){
                return res.json(ApiError.badRequest({message:"Тариф не найден"}))
            }
            await Tarif.destroy({where: {id}})

            return res.status(200).json(tarif)
        }catch(e){
            res.json(ApiError.internal({message: "Ошибка сервера"}))
        }
    }
}

module.exports = new tarifController()