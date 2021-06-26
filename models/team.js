const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const unqueValidator = require('mongoose-unique-validator');

const teamSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    stars: Number,
    city: String
});
teamSchema.plugin(unqueValidator);
teamSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id
        delete object._id
        delete object.__v
    }
})
const Team = model('team', teamSchema);

module.exports = Team;