//Fichero requerido para conectarme a mi base de datos

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/angular', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( db => console.log('Database is connected'))
    .catch(err => console.log(err));