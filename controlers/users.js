const usersRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
usersRouter.get('/', (req, res) => {
    User.find({}).then(users => res.json(users)).catch(err => res.send(err));
})
usersRouter.post('/', async (req, res) => {
    const body = req.body;
    const { name, password, email } = body;
    User.find({ email: email })
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        passwordHash,
        email
    })
    newUser.save().then(user => res.json(user)).catch(error => {
        console.log(error.errors.email.message);
        res.json(error.errors);
    })
})

module.exports = usersRouter;