//Fichero requerido para conectarme a mi base de datos
const mongoose = require('mongoose');
//Variable de entorno
const { DB_URI } = require('./config/index')

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( db => console.log(`Successfully connected with the Database \n${DB_URI}`))
    .catch(err => console.log(err));