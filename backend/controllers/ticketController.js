const ApiError = require('../error/ApiError') 
const {Ticket, Customer, Tarif} = require("../models/models")

class ticketController{
    async create (req, res){
        const {name, surname, email, number, phone_number, date} = req.body
        const customer = await Customer.findOne({where: {email}})
        if (!customer){
            customer = await Customer.create({email, phone_number})
        }
        // const {tarifId} = Tarif.findOne({where:{r}})
        const ticket = await Ticket.create({
            CustomerId: customer.id, 
            tarifId, name, surname,number, date
        })
        return res.json(ticket)
    }
    
    async getAll (req, res){
        const{customerId} = req.body
        const tickets = await Ticket.findAll({where: {customerId}})
        return res.json(tickets)
    }
}

module.exports = new ticketController()