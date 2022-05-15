require('dotenv').config()
const express = require ('express')
const connection = require('./db')
// const Sequelize = require('./db')
// const models = require('./models/models')
const cors = require('cors')





const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000

app.get ('/main', (req , res )=>{
    res.status( 200).json({message: 'WORKING!!'})
})

async function start() {
    try {
        // await Sequelize.authenticate()
        // await Sequelize.sync()
        await connection.authenticate()
        await connection.sync()
        app.listen(PORT, () => {
            console.log("working on the port " + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
// require('./routes')(app);

