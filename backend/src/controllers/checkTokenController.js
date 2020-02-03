const checkTokenController = {};
const jwt = require('jsonwebtoken');

//Variable de entorno
const { SECRET_KEY } = require('../config/index') 


checkTokenController.verifyToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }

    const token = req.headers.authorization.split(' ')[1]
    if(token == null){
        return res.status(401).send('Unauthorized request')
    }

    const payload = jwt.verify(token, SECRET_KEY)
    
    req.userId = payload._id

    next();
}

module.exports = checkTokenController;