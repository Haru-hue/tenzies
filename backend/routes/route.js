const express = require('express');
const router = express.Router()
const tenzies = require('../controllers/tenzie')

router.get('/', tenzies.rawRecord)

router.post('/', tenzies.addPlayer)


module.exports = router