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
module.exports.template = template;