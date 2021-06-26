const playerRouter = require('express').Router();
const Player = require('../models/player');
const Team = require('../models/team');
// ? obtener todos los jugadores
playerRouter.get('/', (req, res) => {
    Player.find({})
        .then(e => {
            res.json(e);
        })
        .catch(e => next(e))
});
//* Agregar un jugador
playerRouter.post("/", (req, res) => {
    const newPlayer = new Player({
        name: req.body.name,
        team: req.body.team,
        number: req.body.number,
        age: req.body.age
    })
    newPlayer.save()
        .then(e => {
            res.json(e);
        })
        .catch(e => {
            next(e);
        })
});
//? Obtener todos los Jugadores de un equipo
playerRouter.get("/:team", (req, res, next) => {
    const team = req.params.team;
    Player.find({ team: team })
        .then(e => {
            res.json(e);
        })
        .catch(e => next(e))
});
//? Obtener un Jugador de un equipo por su numero
playerRouter.get("/:team/:number", (req, res, next) => {
    const team = req.params.team;
    const number = req.params.number;
    Player.find({ team: team, number: number })
        .then(e => {
            res.json(e);
        })
        .catch(e => {
            next(e);
        })

});
//! Eliminar un jugador de un equipo
playerRouter.delete("/:team/:number", (req, res, next) => {
    const number = Number(req.params.number);
    const team = req.params.team;
    Player.findOneAndRemove({ team: team, number: number })
        .then(e => {
            res.json(e)
        })
        .catch(e => next(e));

});

module.exports = playerRouter;