const ApiError = require('../error/ApiError') 
const {Ticket} = require("../models/models")

class ticketController{
    async create (req, res){
        const {name, surname, number, date} = req.body
        const ticket = await Ticket.create({name, surname, number,date})
        return res.json(ticket)

    }
    async getAll (req, res){
        const tickets = await Ticket.findAll()
        return res.json(tickets)
    }
    async getOne (req, res){
        
    }
}

module.exports = new ticketController()