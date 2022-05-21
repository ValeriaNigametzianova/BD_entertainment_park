const { Router } = require('express');
const router = new Router()
const tarifController = require("../controllers/tarifController")


router.post('/edit', tarifController.create)
router.get('/', tarifController.getAll)

module.exports = router