const { Router } = require('express');
const router = Router();
const filmController = require('../controllers/filmController');
const { verifyToken } = require('../middleware/auth')

router.get('', filmController.getFilms);
router.get('/:id', verifyToken, filmController.getFilmById);
router.post('/', verifyToken, filmController.createFilm);
router.put('/:id', verifyToken, filmController.updateFilm);
router.delete('/:id', verifyToken, filmController.deleteFilm);

module.exports = router;