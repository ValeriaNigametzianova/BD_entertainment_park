const { Router } = require('express')
const router = new Router()
const parkRouter = require('./parkRouter')
const stuffRouter = require('./stuffRouter')
const customerRouter = require('./customerRouter')
const adminController = require('../controllers/adminController')

router.use('/park', parkRouter)
router.use('/stuff', stuffRouter)
router.use('/customer', customerRouter)
router.get('/admin', adminController.getAll)

module.exports = router
