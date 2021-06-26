const express = require("express");
const app = express();
const cors = require("cors");
const template = require('../statics/template');
const teamRouter = require('../controlers/teams');
const playerRouter = require('../controlers/players');
const userRouter = require('../controlers/users');

require('dotenv').config()
require('../configdb');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send(template);
});

app.use('/teams', teamRouter);

app.use('/players', playerRouter);

app.use('/users', userRouter);



app.use((e, req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});
app.listen(PORT, () => {
  console.log("Servidor iniciado por el puerto " + PORT);
});
