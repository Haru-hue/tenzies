const mongoose = require('mongoose');
const Player = mongoose.model('Player')
require('../models/db')

exports.addPlayer = (req, res) => {
    var player = new Player()
    player.username = req.body.username
    player.time = req.body.time
    player.rolls = req.body.rolls
    player.save((err) => {
        if(err) console.error(err)
        console.log('Record saved')
    })
}