const { Router } = require('express')
const router = new Router()
const greenZoneController = require('../controllers/greenZoneController')
const ticketController = require('../controllers/ticketController')
const authCustomerMiddleware = require('../middleware/authCustomerMaddleware')

router.post('/', greenZoneController.create)
router.put('/', greenZoneController.update)
router.delete('/', greenZoneController.delete)
// router.get('/ticket', authCustomerMiddleware, ticketController.getAll)
// router.get('/basket', ticketController.getAll)
// router.get('/order', ticketController.getAll)

module.exports = router
