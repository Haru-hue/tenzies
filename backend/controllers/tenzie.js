const mongoose = require('mongoose');
const Player = mongoose.model('Player')
require('../models/db')

exports.addPlayer = (req, res) => {
    var player = new Player()
    player.username = req.body.username
    player.totalTime = req.body.totalTime
    player.totalRounds = req.body.totalRounds
    player.save((err) => {
        if(err) console.error(err)
        console.log('Record saved')
    })
}

exports.rawRecord = async (req, res) => {
    try {
        const rawRecord = await Player.find()
        res.json(rawRecord)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}