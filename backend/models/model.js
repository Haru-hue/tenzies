const mongoose = require('mongoose');

var player = new mongoose.Schema({
    username: {
        type: String,
    },
    totalTime: {
        type: String,
    },
    totalRounds: {
        type: Number
    }
})

module.exports = mongoose.model('Player', player)