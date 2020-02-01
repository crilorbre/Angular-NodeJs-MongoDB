const filmController = {};
const Film = require('../models/Film');


filmController.getFilms = async (req, res) => {
    const films = await Film.find();
    res.status(200).json(films);
}

filmController.getFilmById = async (req, res) => {
    try {
        const id = req.params.id;
        const film = await Film.findById(id);
        res.status(200).json(film);
    } catch (error) {
        res.json(null)
    }
    
}

filmController.createFilm = async (req, res) => {
    const {title, description, image, release_date, genre} = req.body;
    const newFilm = new Film({title, description, image, release_date, genre});
    await newFilm.save();
    res.status(200).json('Film saved');
}

filmController.updateFilm = async (req, res) => {
    const id = req.params.id;
    /*const film = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        release_date: req.body.release_date,
        genre: req.body.genre
    }*/
    await Film.findByIdAndUpdate(id, {$set: req.body});
    res.status(200).json('Film updated')
}

filmController.deleteFilm = async (req, res) => {
    const id = req.params.id;
    await Film.findByIdAndDelete(id);
    res.status(200).json('Film deleted')
}

module.exports = filmController;