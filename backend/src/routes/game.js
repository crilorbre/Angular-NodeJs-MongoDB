const {Router} = require('express');
const router = Router();
const gameController = require('../controllers/gameController');
const { verifyToken } = require('../middleware/auth')


router.get('/', gameController.getGames);
router.get('/:id', verifyToken, gameController.getGameById)
router.post('/', verifyToken, gameController.createGame)
router.put('/:id', verifyToken, gameController.updateGame)
router.delete('/:id', verifyToken, gameController.deleteGame)
router.get('/search/:title', gameController.search)

module.exports = router;