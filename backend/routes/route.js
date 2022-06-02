const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('The API endpoint')
})

router.post('/api', (req, res, next) => {
   console.log(req.body)
})


module.exports = router