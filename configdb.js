const mongoose = require('mongoose');
const conectionString = "mongodb+srv://admin:JairPrada10@cluster0.dfwva.mongodb.net/SoccerApi?retryWrites=true&w=majority";
mongoose.connect(conectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(e => {
    console.log("Conexion establecida")
}).catch(e => {
    console.log("Error en la conexion");
})

