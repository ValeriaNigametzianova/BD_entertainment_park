const { Router } = require('express');
const stuffController = require('../controllers/stuffController');
const parkController = require('../controllers/parkController');
const router = new Router()
const authMiddleware = require("../middleware/authMiddleware")

router.post('/registration', stuffController.registration)
router.post('/login', stuffController.login)
router.get('/auth',authMiddleware, stuffController.check)
router.get('/park',parkController.getAll)

module.exports = router