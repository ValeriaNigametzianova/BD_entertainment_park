const { Router } = require('express');
const router = new Router()
const tarifController = require("../controllers/tarifController")
const authStuffMiddleware = require("../middleware/authStuffMiddleware")


router.post('/edit', authStuffMiddleware,tarifController.create)
router.put('/tarifEdit', authStuffMiddleware,tarifController.update)
router.get('/', tarifController.getAll)
router.delete('/id',authStuffMiddleware,tarifController.delete)

module.exports = router