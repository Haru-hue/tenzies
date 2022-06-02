const express = require('express');
require('./models/db')
const routes = require('./routes/route')

const app = express()
const port = process.env.PORT || 5000 

app.use('/api', routes)

app.listen(port, () => {
    console.log('listening on port: ' + port)
})