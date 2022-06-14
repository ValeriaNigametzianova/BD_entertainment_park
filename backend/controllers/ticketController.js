const ApiError = require('../error/ApiError')
const { Ticket, Customer, Tarif } = require('../models/models')
const pdf = require('html-pdf')
const pdfTemplate = require('../documents/PDF')

class ticketController {
  // async create(req, res) {
  //   const { number, surname, name, date, email, phone_number } = req.body
  //   let customer = await Customer.findOne({ where: { email } })
  //   if (!customer) {
  //     customer = await Customer.create({ email, phone_number })
  //   }
  //   // const {tarifId} = Tarif.findOne({where:{r}})
  //   const tarif = Tarif.findOne(req.params.id)
  //   const ticket = await Ticket.create({
  //     number,
  //     surname,
  //     name,
  //     date,
  //     tarifId: tarif.id,
  //     CustomerId: customer.id,
  //   })
  //   return res.json(ticket)
  // }
  async create(req, res) {
    try {
      const { email, phone_number, surname, name } = req.body.customer
      const date = req.body.date
      let tickets = []
      let counter = 0
      let TarifId = Object.getOwnPropertyNames(req.body.tarifs).map(
        (el) => req.body.tarifs[`${el}`]
      )

      let customer = await Customer.findOne({ where: { email } })
      if (customer === null) {
        customer = await Customer.create({ email, phone_number })
      }
      await Promise.all(
        TarifId.map(async (element) => {
          const tarif = await Tarif.findOne({ where: { id: element.tarif.id } })
          let counter = []
          for (let i = 0; i < element.counter; i++) counter.push(element.tarif)
          console.log('tarif.id', tarif.id)
          await Promise.all(
            counter.map(async (uf) => {
              const ticket = await Ticket.create({
                surname,
                name,
                date,
                TarifId: tarif.id,
                CustomerId: customer.id,
              })
              tickets.push(ticket)
            })
          )
        })
      )
      return res.json(tickets)
    } catch (e) {
      console.log(e.message)
      return res.json({ message: e.message })
    }
  }

  async getAll(req, res) {
    // const{id} = req.params
    // const tickets = await Ticket.findAll({where: {CustomerId: id}})
    // console.log(tickets);
    // return res.json(tickets)
    try {
      const { id } = req.customer
      const files = []
      console.log('id', id)
      await Customer.findOne({ where: { id } }).then(async (customer) => {
        console.log('customer', customer)
        if (!customer) return
        await customer.getTickets().then((tickets) => {
          // console.log('tickets', tickets)

          tickets.map(async (ticket) => {
            const tarif = await Tarif.findOne({ where: { id: ticket.TarifId } })
            console.log('ticket', ticket)
            const file = pdf
              // pdfTemplate({ ticket, tarif })
              .create(pdfTemplate({ ticket, tarif }), { format: 'A5' })
              .toFile('../result.pdf', (err) => {
                if (err) {
                  console.log('err')
                  return res.send(Promise.reject())
                }
                files.push(file)
                console.log('file', file)
                // return res.send(Promise.resolve())
              })
          })
          // res.sendFile(`${__dirname}/result.pdf`)
          console.log('files', files)
          res.send(files)

          // return res.json(tickets)
        })
      })
    } catch (error) {
      console.log(error.message)
      return res.json({ message: error.message })
    }
  }
}

module.exports = new ticketController()
