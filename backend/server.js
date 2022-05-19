require('dotenv').config()
const express = require ('express')
// const connection = require('./db')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const ErrorHandler = require ('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(ErrorHandler)

app.get ('/', (req , res )=>{
    res.status( 200).json({message: 'WORKING!!'})
})

const start =  async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        // await connection.authenticate()
        // await connection.sync()
        app.listen(PORT, () => {
            console.log("working on the port ",PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
// require('./routes')(app);

