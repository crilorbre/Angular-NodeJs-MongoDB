const filmController = {};
const Film = require('../models/Film');


filmController.getFilms = async (req, res) => {
    try {
        const films = await Film.find();
        return res.status(200).json(films);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to obtains films',
            success: false
        })
    }
    
}

filmController.getFilmById = async (req, res) => {
    try {
        const id = req.params.id;
        const film = await Film.findById(id);
        return res.status(200).json(film);
    } catch (error) {
        return res.json(null)
    }
    
}

filmController.createFilm = async (req, res) => {
    try {
        const {title, description, image, release_date, genre} = req.body;
        const newFilm = new Film({title, description, image, release_date, genre});
        await newFilm.save();
        return res.status(200).json({message: 'Film saved',
        success: true});
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to create a new films',
            success: false
        })
    }
    
}

filmController.updateFilm = async (req, res) => {
    try {
        const id = req.params.id;
    /*const film = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        release_date: req.body.release_date,
        genre: req.body.genre
    }*/
        await Film.findByIdAndUpdate(id, {$set: req.body});
        return res.status(200).json({message: 'Film updated',
        success: true })
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to update a film',
            success: false
        })
    }
    
}

filmController.deleteFilm = async (req, res) => {
    try {
        const id = req.params.id;
        await Film.findByIdAndDelete(id);
        return res.status(200).json({message: 'Film deleted',
        success: true})
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to delete a film',
            success: false
        })
    }
    
}

module.exports = filmController;