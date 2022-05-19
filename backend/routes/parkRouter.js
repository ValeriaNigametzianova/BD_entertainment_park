const { Router } = require('express');
const router = new Router()
const parkController = require("../controllers/parkController")

router.post('/', parkController.create)
router.get('/', parkController.getAll)
router.get('/:id', parkController.getOne)
router.delete('/',)

module.exports = router