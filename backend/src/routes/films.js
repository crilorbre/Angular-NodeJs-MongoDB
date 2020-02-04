const { Router } = require('express');
const router = Router();
const filmController = require('../controllers/filmController');
const { userAuth } = require('../middleware/auth-passport')

router.get('', filmController.getFilms);
router.get('/:id', userAuth, filmController.getFilmById);
router.post('/', userAuth, filmController.createFilm);
router.put('/:id', userAuth, filmController.updateFilm);
router.delete('/:id', userAuth, filmController.deleteFilm);

module.exports = router;