const { Router } = require('express');
const router = new Router()
const parkController = require("../controllers/parkController")
const attrationController = require("../controllers/attractionController")

router.post('/', parkController.create)
router.get('/', parkController.getAll)
router.get('/:id', parkController.getOne)
router.get('/:id/description', parkController.getDescription) // страница с описанием парка
router.get('/:id/ attractions', attrationController.getAll) // страница со списком аттракционов
// router.delete('/',)

module.exports = router