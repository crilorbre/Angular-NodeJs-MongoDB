//Fichero requerido para iniciar mi servidor

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();


//Conexion a BD
require('./database');

//Interpretar datos del server
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routas definidas
app.use('/users', require('./routes/user'))
app.use('/games', require('./routes/game'))
app.use('/films', require('./routes/films'))


//Lanzar server
app.listen(3000);
console.log('Server on port', 3000);