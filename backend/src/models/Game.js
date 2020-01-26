const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    title: {
        type:String,
        required: true
    }, 
    description: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
}, {
    timestamps: true
});

module.exports = model('Game', gameSchema);