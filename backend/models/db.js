const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true
}, (err) => {
    if(err) console.log(err) 
    console.log('Connected to Mongoose')
})

require('./model')