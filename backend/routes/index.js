const { Router } = require('express');
const router = new Router()
const parkRouter = require('./parkRouter')
const ticketRouter = require('./ticketRouter')
const stuffRouter = require('./stuffRouter')
const customerRouter = require('./customerRouter');
const adminController = require('../controllers/adminController');


router.use('/park', parkRouter)
router.use('/ticket', ticketRouter)
router.use('/stuff', stuffRouter)
router.use('/customer', customerRouter)
router.get('/admin', adminController.getAll)



module.exports = router