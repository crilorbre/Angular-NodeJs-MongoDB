const gameController = {};
const Game = require('../models/Game');


gameController.getGames = async (req, res) => {
    const games = await Game.find();
    res.status(200).json(games);
}

gameController.getGameById = async(req, res) =>{
    const id = req.params.id;
    const game = await Game.findById(id)
    res.json(game)
}

gameController.createGame = async(req, res) => {
    const {title, description, image} = req.body;
    const newGame = new Game({title, description, image});
    newGame.save();
    res.status(200).json({'Status': 'Game saved'});
}

gameController.updateGame = async(req, res) =>{
    const {id} = req.params;
    /*const game = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }*/
    await Game.findByIdAndUpdate(id, {$set: req.body})
    res.status(200).json({'Status': 'Game updated'});
}

gameController.deleteGame = async (req, res) => {
    const {id} = req.params;
    await Game.findByIdAndDelete(id);
    res.status(200).json({'Status': 'Game deleted'})
}

gameController.search = async (req, res) => {
    const {title} = req.params;
    const game = await Game.find({title: {$regex: title, $options:'i'}})
    res.json(game);
}

module.exports = gameController;