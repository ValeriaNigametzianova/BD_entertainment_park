const { Router } = require('express');
const userController = require('../controllers/userController');
const router = new Router()
const UserController = require ('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',userController.check)

module.exports = router