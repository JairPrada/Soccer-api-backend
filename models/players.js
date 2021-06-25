const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const playerSchema = new Schema({
    name: String,
    team: String,
    number: Number,
    age: Number,
    position: String
});

const Player = model('player', playerSchema);
playerSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id
        delete object._id
        delete object.__v
    }
});

module.exports = Player;
