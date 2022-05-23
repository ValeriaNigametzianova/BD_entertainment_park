const ApiError = require('../error/ApiError') 
const {Ticket, Customer, Tarif} = require("../models/models")

class ticketController{
    async create (req, res){
        const {number,surname,name, email, phone_number,} = req.body
        let customer = await Customer.findOne({where: {email}})
        if (!customer){
            customer = await Customer.create({email, phone_number})
        }
        // const {tarifId} = Tarif.findOne({where:{r}})
        const tarif = Tarif.findOne(req.params.id)
        const ticket = await Ticket.create({
            number,surname, name, 
            tarifId: tarif.id,
            CustomerId: customer.id,  
        })
        return res.json(ticket)
    }
    
    async getAll (req, res){
        // const{id} = req.params
        // const tickets = await Ticket.findAll({where: {CustomerId: id}})
        // console.log(tickets);
        // return res.json(tickets)
        const {id} = req.customer
        Customer.findOne({where: {id}}).
            then(customer=>{
               if(!customer) return;
               customer.getTickets().then(tickets=>{
                //    for(park of parks){
                //        console.log(park);
                //     }
                return res.json({tickets})  
            });
        });
    }
}

module.exports = new ticketController()