const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUpUser);
router.post('/signin', userController.singInUser);
router.get('/email/:email', userController.getUserByEmail)
router.get('/username/:username', userController.getUserByUsername)

module.exports = router;

