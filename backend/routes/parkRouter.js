const { Router } = require('express');
const router = new Router()
const parkController = require("../controllers/parkController")
const attrationController = require("../controllers/attractionController")
const tarifController = require ("../controllers/tarifController")
const tarifRouter = require('./tarifRouter')

router.post('/', parkController.create)
router.get('/', parkController.getAll)
router.get('/:id', parkController.getOne)
router.get('/:id/description', parkController.getDescription) // страница с описанием парка
router.get('/:id/attraction', attrationController.getAll) // страница со списком аттракционов
router.get('/:id/tarif', tarifController.getAll) // страница со списком тарифов

// router.delete('/',)

module.exports = router