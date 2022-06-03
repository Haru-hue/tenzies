const express = require('express');
const cors =  require('cors');
require('./models/db')
const routes = require('./routes/route')

const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

app.listen(port, () => {
    console.log('listening on port: ' + port)
})