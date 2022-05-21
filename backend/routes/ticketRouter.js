const { Router } = require('express');
const router = new Router()
const ticketController = require("../controllers/ticketController")

router.post('/', ticketController.create)
// router.get('/', ticketController.getAll)

module.exports = router