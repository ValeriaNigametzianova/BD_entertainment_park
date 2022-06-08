const { Router } = require('express')
const router = new Router()
const authStuffMiddleware = require('../middleware/authStuffMiddleware')
const attractionController = require('../controllers/attractionController')

router.post('/', authStuffMiddleware, attractionController.create)
router.get('/', attractionController.getAll)
router.get('/:id', authStuffMiddleware, attractionController.getOne)
router.put('/', authStuffMiddleware, attractionController.update)
router.delete('/', authStuffMiddleware, attractionController.delete)

module.exports = router
