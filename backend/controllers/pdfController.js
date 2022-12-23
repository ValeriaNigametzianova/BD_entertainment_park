const pdf = require('html-pdf')
const pdfTemplate = require('../documents')
const { Park } = require('../models/models')

class pdfController {
  async createPDF(req, res) {
    try {
      const { tarif } = req.body
      const park = Park.findOne({ where: { id: tarif.ParkId } })
      console.log('park', park)
      console.log('tarif', tarif)
      const PDF = pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
          return res.send(Promise.reject())
        }
        return res.send(Promise.resolve())
      })
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async fetchPDF(req, res) {
    try {
      return res.sendFile(`${__dirname}/result.pdf`)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}
module.exports = new pdfController()
