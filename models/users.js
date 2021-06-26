const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: String,
    passwordHash: String,
    email: {
        type: String,
        unique: true
    }
})
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, object) => {
        id = object._id
        delete object.__v
        delete object._id
        delete object.passwordHash
    }
})

const User = new model('user', userSchema);

module.exports = User;
