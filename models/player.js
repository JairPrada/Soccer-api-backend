const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const playerSchema = new Schema({
    name: String,
    team: String,
    number: {
        type: Number,
        unique: true
    },
    age: Number,
    position: String
});
playerSchema.plugin(uniqueValidator);

const Player = model('player', playerSchema);
playerSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id
        delete object._id
        delete object.__v
    }
});

module.exports = Player;
