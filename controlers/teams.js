const teamRouter = require('express').Router();
const Team = require('../models/team');
const Player = require('../models/player');
//? Obtener todos los equipos
teamRouter.get("/", (req, res, next) => {
    Team.find({})
        .then(e => {
            res.json(e)
        })
        .catch(error => { next(error) })
});
//* Agregar un equipo
teamRouter.post("/", (req, res, next) => {
    const newTeamBody = req.body;
    const newteam = new Team({
        name: newTeamBody.name,
        stars: newTeamBody.stars,
        city: newTeamBody.city
    })
    newteam.save()
        .then(e => {
            res.json(e)
        })
        .catch(e => next(e))
});
//? Obtener un equipo
teamRouter.get("/:team", (req, res) => {
    const team = req.params.team;
    Team.find({ name: team })
        .then(e => {
            res.json(e)
        })
        .catch(e => res.status(404).json({ data: "not found" }))
});
//! Eliminar un equipo
teamRouter.delete("/:team", (req, res) => {
    const team = req.params.team;
    Team.deleteMany({ name: team })
        .then(e => {
            Player.deleteMany({ team: team }).then(e => {
                res.json({ message: "Delete team and players" })
            })
        }).catch(e => next(e))

});


module.exports = teamRouter