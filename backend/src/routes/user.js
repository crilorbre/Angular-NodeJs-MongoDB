const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');



router.get('/', (req, res) => res.send('Hello world'));
router.post('/signup', userController.signUpUser);
router.post('/signin', userController.singInUser);
router.get('/email/:email', userController.getUserByEmail)
router.get('/username/:username', userController.getUserByUsername)

router.get('/task', (req, res) => {
    res.json({
        _id: 1,
        name: 'task one',
        description: 'task prueba'
    })
})

router.get('/private-task', verifyToken, (req, res) =>{
    res.json({
        _id: 1,
        name: 'task one',
        description: 'task prueba'
    })
})

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Anunthorize request')
    }

    const token = req.headers.authorization.split(' ')[1]
    if(token == null){
        return res.status(401).send('Anunthorize request')
    }

    const payload = jwt.verify(token, 'secretkey')
    
    req.userId = payload._id

    next();
}