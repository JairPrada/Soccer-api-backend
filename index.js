const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { template } = require('./template');
const { teams } = require('./teams');
const { players } = require('./players');
const Team = require('./models/team');
require('./configdb');

const searchPlayers = (equipo) => {
  return players.filter((e) => e.name == equipo)[0].players;
};
const searchTeams = (team) => {
  return teams.filter((e) => e.name == team);
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(template);
});

//? Obtener todos los equipos
app.get("/allteams", (req, res) => {
  if (teams) {
    Team.find({}).then(e => res.json(e))
  } else {
    res.status(404).json({ data: "not found" });
  }
});

//? Obtener un equipo
app.get("/team/:team", (req, res) => {
  const team = req.params.team;
  Team.find({ name: team })
    .then(e => res.json(e))

});

//! Eliminar un equipo
app.delete("/team/:team", (req, res) => {
  const team = req.params.team;
  teams.map((e, index) => {
    if (e.name == team) {
      console.log(teams.splice(index, 1));
      players.map((e, index2) => {
        if (e.name == team) {
          players.splice(index2, 1);
        }
      });
    }
  });
  res.send(searchTeams(team));
});

//* Agregar un equipo
app.post("/team/", (req, res) => {
  const newTeam = req.body;
  console.log(newTeam);
  teams.map((e) => {
    if (e.name == newTeam) {
      return res.json({ message: "EL equipo ya esta registrado" });
    } else {
      teams.push(newTeam);
      res.json(teams);
    }
  });
});

//? Obtener todos los Jugadores de un equipo
app.get("/team/:team/allplayers", (req, res) => {
  const team = req.params.team;
  res.json(searchPlayers(team));
});

//? Obtener un Jugador de un equipo
app.get("/team/:team/player/:number", (req, res) => {
  const team = req.params.team;
  const number = req.params.number;
  res.json(searchPlayers(team)[number]);
});

//! Eliminar un jugador de un equipo
app.delete("/team/:team/player/:number", (req, res) => {
  const number = req.params.number;
  const team = req.params.team;
  players.map((e) => {
    if (e.name == team) {
      console.log(e.players.splice(number, 1));
    }
  });
  res.send(searchPlayers(team));
});

//* Agregar un jugador
app.post("/team/:team/player", (req, res) => {
  const newPlayer = req.body;
  const team = req.params.team;

  players.map((e) => {
    if (e.name == team) {
      console.log(e);
      e.players.push(newPlayer.name);
      return res.json(searchPlayers(team));
    }
  });
  res.json({ message: "Error equipo no existe" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Servidor iniciado por el puerto " + PORT);
});
