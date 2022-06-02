const mongoose = require('mongoose');

var game = new mongoose.Schema({
    username: {
        type: String,
        required: 'This field is required'
    }
})

mongoose.model('Game', game)