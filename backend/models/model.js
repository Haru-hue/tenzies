const mongoose = require('mongoose');

var player = new mongoose.Schema({
    username: {
        type: String,
    },
    time: {
        type: String,
    },
    rolls: {
        type: Number
    }
})

module.exports = mongoose.model('Player', player)