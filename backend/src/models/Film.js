const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    genre: {
        type: String, 
        required: true
    }
})

module.exports = model('Film', filmSchema)