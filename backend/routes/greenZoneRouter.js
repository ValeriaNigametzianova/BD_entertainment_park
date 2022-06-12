const { Router } = require('express')
const router = new Router()
const greenZoneController = require('../controllers/greenZoneController')

router.post('/', greenZoneController.create)
router.put('/', greenZoneController.update)
router.delete('/', greenZoneController.delete)

module.exports = router
