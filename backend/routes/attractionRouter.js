const { Router } = require('express');
const router = new Router()
const attractionController = require("../controllers/attractionController")


router.post('/', attractionController.create)
router.get('/', attractionController.getAll)

module.exports = router