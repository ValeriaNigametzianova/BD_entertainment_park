require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware')
const paginate = require('express-paginate')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'PDFTickets')))
app.use(express.static(path.resolve(__dirname, '..', 'ParkPhotos')))
app.use(fileUpload({}))
app.use(paginate.middleware(10, 50))
app.use('/api', router)
app.use(ErrorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log('working on the port ', PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
