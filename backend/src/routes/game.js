const {Router} = require('express');
const router = Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getGames);
router.get('/:id', gameController.getGameById)
router.post('/', gameController.createGame)
router.put('/:id', gameController.updateGame)
router.delete('/:id', gameController.deleteGame)
router.get('/search/:title', gameController.search)

module.exports = router;