const ApiError = require('../error/ApiError') 
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {Stuff, Park, Admin, Customer, Ticket,Tarif} = require("../models/models")

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY, 
        {expiresIn: "6h"}
    )
}

class StuffController{
    async registration (req, res, next){
        const {login, password} = req.body
        if(!login || !password){
            return next(ApiError.badRequest("Некорректные данные"))
        }
        const candidate = await Stuff.findOne({where:{login}})
        if (candidate){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const stuff = await Stuff.create({login, password: hashPassword})
        const admin = await Admin.create({stuffId: stuff.id})
        //выводить все билеты, у чела -корзина
        const token = generateJwt(stuff.id, stuff.login)
        return res.json({token})
    }

    async login (req, res, next){
        const {login, password} = req.body
        const stuff = await Stuff.findOne({where: {login}})
        if (!stuff){
            return next (ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, stuff.password)
        if (!comparePassword){
            return next (ApiError.internal("Указан неверный пароль"))
        }
        const token = generateJwt(stuff.id, stuff.login)
        return res.json({token})
    }
    
    async check (req, res, next){
        const token = generateJwt(req.stuff.id, req.stuff.login)
        return res.json({token})   
    }

    async park (req, res, next){
        const {id} = req.stuff
        // const stuff = await Stuff.findOne({where: {id}})
        // // const stuffId = stuff.id
        // const parks = await Park.findAll({include: [
        //     {
        //         model: Admin,
        //         through: {
        //             attributes: [{stuffId: stuff.id}]
        // }}]}) 
        // return res.json(parks)
        Stuff.findOne({where: {id}}).
            then(stuff=>{
               if(!stuff) return;
               stuff.getParks().then(parks=>{
                //    for(park of parks){
                //        console.log(park);
                //     }
                return res.json({parks})  
            });
        });
    }

    async getTarif (req, res, next){
        const {id} = req.stuff
        let findParks
        Stuff.findOne({where: {id}}).
            then(stuff=>{
                if(!stuff) return;
                stuff.getParks().then(parks=>{
                        findParks =   parks
                });
        })
        const tarifs = Tarif.findAll({where: {ParkId:findParks.id}})
        return res.json({tarifs})  
    }
}

module.exports = new StuffController()
