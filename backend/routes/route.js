const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('The API endpoint')
})

router.post('/api', (req, res, next) => {
    let { username } = req.body.data;
    console.log(username)
    // here you send a post request to the weather API url
    // to retrieve the results, then send them back
    // to your react app to display them
})


module.exports = router