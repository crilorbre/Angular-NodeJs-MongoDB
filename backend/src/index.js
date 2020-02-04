//Fichero requerido para iniciar mi servidor
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const app = express();

//Variables de entorno
const { PORT } = require('./config/index')

//Conexion a BD
require('./database');

//Interpretar datos del server
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(passport.initialize());

require('./middleware/passport')(passport)

//Routas definidas
app.use('/users', require('./routes/user'))
app.use('/games', require('./routes/game'))
app.use('/films', require('./routes/films'))


//Lanzar server
app.listen(PORT);
console.log('Server started on port', PORT);