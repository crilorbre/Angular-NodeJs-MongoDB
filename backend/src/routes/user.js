const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const { userAuth } = require('../middleware/auth-passport')
const { serializeUser } = require('../utils/user')

router.post('/signup', userController.signUpUser);
router.post('/signin', userController.singInUser);
router.get('/email/:email', userController.getUserByEmail)
router.get('/username/:username', userController.getUserByUsername)
router.get('/profile', userAuth, userController.profile)
router.post('/update', userAuth, userController.updateUser)
router.post('/refresh', userController.refreshToken);


module.exports = router;

