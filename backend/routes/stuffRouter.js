const { Router } = require('express');
const stuffController = require('../controllers/stuffController');
const parkController = require('../controllers/parkController');
const attractionController = require("../controllers/attractionController")
const tarifController = require("../controllers/tarifController")
const router = new Router()
const authStuffMiddleware = require("../middleware/authStuffMiddleware")
const tarifRouter = require('./tarifRouter')
const attractionRouter = require("./attractionRouter")
const parkRouter = require("./parkRouter")

router.post('/registration', stuffController.registration)
router.post('/login', stuffController.login)
router.get('/auth',authStuffMiddleware, stuffController.check)
router.get('/park',authStuffMiddleware,stuffController.park)
router.post('/park', authStuffMiddleware, parkController.create)
router.use('/attraction',attractionRouter)
router.use('/tarif',authStuffMiddleware, tarifRouter)
router.get('/tarif',authStuffMiddleware, stuffController.getTarif)


module.exports = router