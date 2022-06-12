const pdf = require('html-pdf')
const pdfTemplate = require('../documents')

class pdfController {
  async createPDF(req, res) {
    const PDF = pdf
      .create(pdfTemplate(req.body), {})
      .toFile('result.pdf', (err) => {
        if (err) {
          return res.send(Promise.reject())
        }
        return res.send(Promise.resolve())
      })
  }

  async fetchPDF(req, res) {
    res.sendFile(`${__dirname}/result.pdf`)
  }
}
module.exports = new pdfController()
