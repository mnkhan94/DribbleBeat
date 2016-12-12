// load the things we need
var mongoose = require('mongoose');

// define the schema for our game model
var gameSchema = mongoose.Schema({
    location: String,
    date: String,
    time: String,
    minimum: Number,
    maximum: Number,
    user_id: String
});

// create the model for games and expose it to our app
module.exports = mongoose.model('Game', gameSchema);