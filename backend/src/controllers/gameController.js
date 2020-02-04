const gameController = {};
const Game = require('../models/Game');


gameController.getGames = async (req, res) => {
    try {
        const games = await Game.find();
        return res.status(200).json(games);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to obtains games',
            success: false
        })
    }
    
}

gameController.getGameById = async(req, res) =>{
    try {
        const id = req.params.id;
        const game = await Game.findById(id)
        return res.json(game)
    } catch (error) {
        return res.json(null)
    }
    
}

gameController.createGame = async(req, res) => {
    try {
        const {title, description, image} = req.body;
        const newGame = new Game({title, description, image});
        newGame.save();
        return res.status(200).json({message: 'Game saved',
        success: true});
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to create a new game',
            success: false
        })
    }
    
}

gameController.updateGame = async(req, res) =>{
    try {
        const {id} = req.params;
    /*const game = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }*/
        await Game.findByIdAndUpdate(id, {$set: req.body})
        return res.status(200).json({message: 'Game updated', 
        success: true});
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to update a game',
            success: false
        })
    }
    
}

gameController.deleteGame = async (req, res) => {
    try {
        const {id} = req.params;
        await Game.findByIdAndDelete(id);
        return res.status(200).json({message: 'Game deleted',
        success: true})
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to delete a game',
            success: false
        })
    }
    
}

gameController.search = async (req, res) => {
    const {title} = req.params;
    const game = await Game.find({title: {$regex: title, $options:'i'}})
    res.json(game);
}

module.exports = gameController;