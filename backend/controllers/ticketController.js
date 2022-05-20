const ApiError = require('../error/ApiError') 
const {Ticket, Customer} = require("../models/models")

class ticketController{
    async create (req, res){
        const {name, surname, email, number, phone_number, date} = req.body
        const customer = await Customer.create({email, phone_number})
        const ticket = await Ticket.create({customerId: customer.id, name, surname, email, number, date})
        return res.json(ticket)
    }
    
    async getAll (req, res){
        const customer = await Customer.findOne({where: {login}})
        const tickets = await Ticket.findAll({customerId: customer.id})
        return res.json(tickets)
    }
}

module.exports = new ticketController()