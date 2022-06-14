const { Router } = require('express')
const router = new Router()
const customerController = require('../controllers/customerController')
const ticketController = require('../controllers/ticketController')
const authCustomerMiddleware = require('../middleware/authCustomerMaddleware')

router.post('/registration', customerController.registration)
router.post('/login', customerController.login)
router.get('/auth', authCustomerMiddleware, customerController.check)
router.get('/ticket', authCustomerMiddleware, ticketController.getAll)
router.get('/tickets', authCustomerMiddleware, ticketController.getTickets)
// router.get('/basket', ticketController.getAll)
// router.get('/order', ticketController.getAll)

module.exports = router
