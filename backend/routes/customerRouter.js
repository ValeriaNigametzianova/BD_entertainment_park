const { Router } = require('express');
const router = new Router()
const customerController = require("../controllers/customerController")
const ticketController = require("../controllers/ticketController")


router.post('/login', customerController.login)
router.get('/auth', customerController.check)
router.get('/ticket', ticketController.getAll)
// router.get('/basket', ticketController.getAll)
// router.get('/order', ticketController.getAll)

module.exports = router