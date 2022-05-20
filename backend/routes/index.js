const { Router } = require('express');
const router = new Router()
const parkRouter = require('./parkRouter')
const ticketRouter = require('./ticketRouter')
const stuffRouter = require('./stuffRouter')


router.use('/park', parkRouter)
router.use('/ticket', ticketRouter)
router.use('/stuff', stuffRouter)

module.exports = router