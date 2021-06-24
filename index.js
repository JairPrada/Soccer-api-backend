const express = require("express");
const app = express();
const cors = require("cors");
const template = `
<html>
<head>
<style>
body{
    display:flex;
    flex-flow: column wrap;
    justify-content:center;
    align-items:center;
    font-family: arial, sans-serif;
}
h2{
    text-align:center;
  
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin:0 auto;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>

<h2>API FUTBOL COLOMBIANO</h2>

<table>
  <tr>
    <th>Descripcion</th>
    <th>Ruta</th>
    <th>Verbo</th>
  </tr>
  <tr>
    <td>Ruta para obtener todos los equipos</td>
    <td>/allteams</td>
    <td style="color:green;">GET</td>
  </tr>
  <tr>
    <td>Ruta para obtener un equipo</td>
    <td>/team/[nombre del equipo]</td>
    <td style="color:green;">GET</td>
  </tr>
  <tr>
    <td>Ruta para eliminar un equipo</td>
    <td>/team/[nombre del equipo]</td>
    <td style="color:red;">DELETE</td>
  </tr>
  <tr>
    <td>Ruta para agregar un equipo (debe enviar en el body, name,stars,city)</td>
    <td>/team</td>
    <td style="color:blue;">POST</td>
  </tr>
  <tr>
    <td>Para obtener todos los jugadores de un equipo</td>
    <td>/team/[nombre del equipo]/allplayers</td>
    <td style="color:green;">GET</td>
  </tr>
  <tr>
    <td>Para obtenerun jugador de un equipo</td>
    <td>/team/[nombre del equipo]/player/[numero del jugador]</td>
    <td style="color:green;">GET</td>
  </tr>
  <tr>
    <td>Para eliminar un jugador de un equipo</td>
    <td>/team/[nombre del equipo]/player/[numero del jugador]</td>
    <td style="color:red;">DELETE</td>
  </tr>
  <tr>
    <td>Para agregar un jugador de un equipo (debe enviar el nombre del jugador )</td>
    <td>/team/[nombre del equipo]/player/</td>
    <td style="color:blue;">POST</td>
  </tr>
</table>

</body>
</html>
`;
var teams = [
  {
    name: "Millonarios FC",
    stars: "15",
    city: "Bogota DC",
  },

  {
    name: "Atletico Nacional",
    stars: "16",
    city: "Bogota DC",
  },
  {
    name: "América de Cali",
    stars: "15",
    city: "Cali",
  },
  {
    name: "Deportivo Cali",
    stars: "15",
    city: "Cali",
  },
  {
    name: "Junior",
    stars: "9",
    city: "Barranquilla",
  },
  {
    name: "Santa Fe",
    stars: "9",
    city: "Bogota DC",
  },
  {
    name: "Medellín",
    stars: "6",
    city: "Medellín",
  },
  {
    name: "Once Caldas",
    stars: "4",
    city: "Manizales",
  },
  {
    name: "Deportes Tolima",
    stars: "3",
    city: "Ibage",
  },
  {
    name: "Deportivo Pasto",
    stars: "1",
    city: "Pasto",
  },
  {
    name: "Deportes Quindío",
    stars: "1",
    city: "Quindío",
  },
  {
    name: "Cúcuta Deportivo",
    stars: "1",
    city: "Cúcuta",
  },
  {
    name: "Unión Magdalena",
    stars: "1",
    city: "Barranquilla",
  },
  {
    name: "Boyacá Chicó",
    stars: "1",
    city: "Boyacá",
  },
];
var players = [
  {
    name: "Millonarios FC",
    players: ["Juan Moreno", "Macalister Silva"],
  },

  {
    name: "Atletico Nacional",
    players: ["Rifle Andrade", "Baldomero Perlaza"],
  },
  {
    name: "América de Cali",
    players: ["Duvan vergara", "Adrian Ramos"],
  },
  {
    name: "Deportivo Cali",
    players: ["Marco Perez", "Angelo Rodirgez"],
  },
  {
    name: "Junior",
    players: ["Teofilo Rodrigez", "Miguel Borja"],
  },
  {
    name: "Santa Fe",
    players: ["Andres Castellanos", "Andres Perez"],
  },
  {
    name: "Medellín",
    players: ["Migel Reina", "Agustin Guletichs"],
  },
  {
    name: "Once Caldas",
    players: ["Dayro Moreno", "Edwin Velasco"],
  },
  {
    name: "Deportes Tolima",
    players: ["Hamilton Campaz", "Juan Caicedo"],
  },
  {
    name: "Deportivo Pasto",
    players: [],
  },
  {
    name: "Deportes Quindío",
    players: [],
  },
  {
    name: "Cúcuta Deportivo",
    players: [],
  },
  {
    name: "Unión Magdalena",
    players: [],
  },
  {
    name: "Boyacá Chicó",
    players: [],
  },
];

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
    res.json(teams);
  } else {
    res.status(404).json({ data: "not found" });
  }
});

//? Obtener un equipo
app.get("/team/:team", (req, res) => {
  const team = req.params.team;
  res.json(searchTeams(team));
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
