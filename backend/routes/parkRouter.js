const { Router } = require('express')
const router = new Router()
const parkController = require('../controllers/parkController')
const attrationController = require('../controllers/attractionController')
const tarifController = require('../controllers/tarifController')
const authStuffMiddleware = require('../middleware/authStuffMiddleware')
const ticketController = require('../controllers/ticketController')
const greenZoneController = require('../controllers/greenZoneController')

router.get('/', parkController.getAll)
router.post('/', authStuffMiddleware, parkController.create)
router.get('/:id', parkController.getOne)
router.get('/:id/description', parkController.getDescription)
router.get('/:id/attraction', attrationController.getAll)
router.get('/:id/tarif', tarifController.getAll)
router.post('/:id/tarif', ticketController.create)

router.put('/', authStuffMiddleware, parkController.update)
router.put('/gz', authStuffMiddleware, greenZoneController.update)
router.delete('/:id', authStuffMiddleware, parkController.delete)

module.exports = router
