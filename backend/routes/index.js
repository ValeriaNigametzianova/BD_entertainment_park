const { Router } = require('express');
const router = new Router()
const parkRouter = require('./parkRouter')
const ticketRouter = require('./ticketRouter')
const userRouter = require('./userRouter')

router.use('/park', parkRouter)
router.use('/ticket', ticketRouter)
router.use('/user', userRouter)

module.exports = router