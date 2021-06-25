const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const teamSchema = new Schema({
    name: String,
    stars: Number,
    city: String
});

teamSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id
        delete object._id
        delete object.__v
    }
})
const Team = model('team', teamSchema);

module.exports = Team;