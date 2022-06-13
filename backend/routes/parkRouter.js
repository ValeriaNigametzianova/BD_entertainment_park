const { Router } = require('express')
const router = new Router()
const parkController = require('../controllers/parkController')
const attrationController = require('../controllers/attractionController')
const tarifController = require('../controllers/tarifController')
const authStuffMiddleware = require('../middleware/authStuffMiddleware')
const tarifRouter = require('./tarifRouter')
const ticketRouter = require('./ticketRouter')
const ticketController = require('../controllers/ticketController')
const greenZoneController = require('../controllers/greenZoneController')

// router.post('/', parkController.create)
router.get('/', parkController.getAll)
router.post('/', authStuffMiddleware, parkController.create)
router.get('/:id', parkController.getOne)
router.get('/:id/description', parkController.getDescription) // страница с описанием парка
router.get('/:id/attraction', attrationController.getAll) // страница со списком аттракционов
router.get('/:id/tarif', tarifController.getAll) // страница со списком тарифов
router.post('/:id/tarif', ticketController.create) // страница со списком тарифов

router.put('/', authStuffMiddleware, parkController.update)
router.put('/gz', authStuffMiddleware, greenZoneController.update)
router.delete('/:id', authStuffMiddleware, parkController.delete)

// router.delete('/',)

module.exports = router
