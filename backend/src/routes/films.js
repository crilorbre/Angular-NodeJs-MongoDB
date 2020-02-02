const { Router } = require('express');
const router = Router();
const filmController = require('../controllers/filmController');
const checkTokenController = require('../controllers/checkTokenController')

router.get('', filmController.getFilms);
router.get('/:id', checkTokenController.verifyToken, filmController.getFilmById);
router.post('/', checkTokenController.verifyToken, filmController.createFilm);
router.put('/:id', checkTokenController.verifyToken, filmController.updateFilm);
router.delete('/:id', checkTokenController.verifyToken, filmController.deleteFilm);

module.exports = router;