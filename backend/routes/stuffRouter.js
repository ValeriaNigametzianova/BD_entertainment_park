const { Router } = require('express');
const stuffController = require('../controllers/stuffController');
const parkController = require('../controllers/parkController');
const attractionController = require("../controllers/attractionController")
const tarifController = require("../controllers/tarifController")
const router = new Router()
const authMiddleware = require("../middleware/authMiddleware")
const tarifRouter = require('./tarifRouter')

router.post('/registration', stuffController.registration)
router.post('/login', stuffController.login)
router.get('/auth',authMiddleware, stuffController.check)
router.get('/park',stuffController.park)
router.get('/attraction',attractionController.getAll)
router.use('/tarif',tarifRouter)


module.exports = router