const { Router } = require('express');
const router = Router();
const filmController = require('../controllers/filmController');

router.get('', filmController.getFilms);
router.get('/:id', filmController.getFilmById);
router.post('/', filmController.createFilm);
router.put('/:id', filmController.updateFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;