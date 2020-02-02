const {Router} = require('express');
const router = Router();
const gameController = require('../controllers/gameController');
const checkTokenController = require('../controllers/checkTokenController')

router.get('/', gameController.getGames);
router.get('/:id', checkTokenController.verifyToken, gameController.getGameById)
router.post('/', checkTokenController.verifyToken, gameController.createGame)
router.put('/:id', checkTokenController.verifyToken, gameController.updateGame)
router.delete('/:id', checkTokenController.verifyToken, gameController.deleteGame)
router.get('/search/:title', gameController.search)

module.exports = router;