const { Router } = require('express')
const router = new Router()
const tarifController = require('../controllers/tarifController')
const authStuffMiddleware = require('../middleware/authStuffMiddleware')

router.post('/', authStuffMiddleware, tarifController.create)
router.put('/', authStuffMiddleware, tarifController.update)
router.get('/', tarifController.getAll)
router.get('/:id', authStuffMiddleware, tarifController.getOne)
router.delete('/', authStuffMiddleware, tarifController.delete)

module.exports = router
