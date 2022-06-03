const express = require('express');
const router = express.Router()
const tenzies = require('../controllers/tenzie')

router.get('/', (req, res) => {
    res.send('The API endpoint')
})

router.post('/', tenzies.addPlayer)


module.exports = router