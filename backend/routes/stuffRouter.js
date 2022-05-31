const { Router } = require('express')
const stuffController = require('../controllers/stuffController')
const parkController = require('../controllers/parkController')
const attractionController = require('../controllers/attractionController')
const tarifController = require('../controllers/tarifController')
const router = new Router()
const authStuffMiddleware = require('../middleware/authStuffMiddleware')
const tarifRouter = require('./tarifRouter')
const attractionRouter = require('./attractionRouter')
const parkRouter = require('./parkRouter')
const greenZoneController = require('../controllers/greenZoneController')
const greenZoneRouter = require('./greenZoneRouter')

router.post('/registration', stuffController.registration)
router.post('/login', stuffController.login)
router.get('/auth', authStuffMiddleware, stuffController.check)
router.use('/park', parkRouter)
router.get('/getPark', authStuffMiddleware, stuffController.getGreenZone)
router.use('/attraction', attractionRouter)
router.get('/getAttraction', authStuffMiddleware, stuffController.getAttraction)
router.use('/tarif', tarifRouter)
// router.get('/getGreenZone', greenZoneController.getGreenZone)
router.use('/greenZone', greenZoneRouter)
router.get('/getTarif', authStuffMiddleware, stuffController.getTarif)

module.exports = router
