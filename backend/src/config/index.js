const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/../../.env'})

module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    SECRET_KEY: process.env.SECRET_KEY
}