const express = require('express');
const router = express.Router({mergeParams: true});
const Song = require('../model/song');
// const requestGenerator = require('../request-generator');
// const auth = require('../authorization');

// Connect

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/album');

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
    console.log("db connection successful");
});

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get songs
router.get('/songs', (req, res) => {
    Song.find()
        .limit(4)
        .then((songs) => {
            response.data = songs;
            res.send(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
});


module.exports = router;