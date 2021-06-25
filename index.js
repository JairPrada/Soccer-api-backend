const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const { template } = require('./template');
const Team = require('./models/team');
const Player = require('./models/players');
require('./configdb');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(template);
});

//? Obtener todos los equipos
app.get("/allteams", (req, res, next) => {

  Team.find({})
    .then(e => {
      res.json(e)
    })
    .catch(error => { next(error) })

});

//? Obtener un equipo
app.get("/team/:team", (req, res) => {
  const team = req.params.team;
  Team.find({ name: team })
    .then(e => {
      res.json(e)
    })
    .catch(e => res.status(404).json({ data: "not found" }))
});

//! Eliminar un equipo
app.delete("/team/:team", (req, res) => {
  const team = req.params.team;
  Team.deleteMany({ name: team })
    .then(e => {
      Player.deleteMany({ team: team }).then(e => {
        res.json({ message: "Delete team and players" })
      })
    }).catch(e => next(e))

});

//* Agregar un equipo
app.post("/newteam/", (req, res, next) => {
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

//? Obtener todos los Jugadores de un equipo
app.get("/team/:team/allplayers", (req, res, next) => {
  const team = req.params.team;
  Player.find({ team: team })
    .then(e => {
      res.json(e);
    })
    .catch(e => next(e))
});
// ? obtener todos los jugadores
app.get('/allplayers', (req, res) => {
  Player.find({})
    .then(e => {
      res.json(e);
    })
    .catch(e => next(e))
});
//? Obtener un Jugador de un equipo por su numero
app.get("/team/:team/player/:number", (req, res, next) => {
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
app.delete("/team/:team/player/:number", (req, res, next) => {
  const number = Number(req.params.number);
  const team = req.params.team;
  Player.findOneAndRemove({ team: team, number: number })
    .then(e => {
      res.json(e)
    })
    .catch(e => next(e));

});

//* Agregar un jugador
app.post("/team/player", (req, res) => {
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


app.use((e, req, res, next) => {
  console.log(e)
  res.status(404).json({ error: "Error no encntrado" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Servidor iniciado por el puerto " + PORT);
});
