const {Router} = require('express');
const router = Router();
const gameController = require('../controllers/gameController');
const { userAuth } = require('../middleware/auth-passport')



router.get('/', gameController.getGames);
router.get('/:id', userAuth, gameController.getGameById)
router.post('/', userAuth, gameController.createGame)
router.put('/:id', userAuth, gameController.updateGame)
router.delete('/:id', userAuth, gameController.deleteGame)
router.get('/search/:title', gameController.search)

module.exports = router;