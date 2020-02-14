const userController = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Metodos auxiliates
const {validateUsername, validateEmail} = require('../utils/user')

//Variable de entorno
const { SECRET_KEY, REFRESH_KEY } = require('../config/index') 

//Registrar a un usuario
userController.signUpUser = async (req, res) =>{

    try {
        const {email, password, username, firstName, lastName} = req.body;
        const newUser = new User({email, password, username, firstName, lastName})

        let usernameTaken = await validateUsername(newUser.username);
        if(usernameTaken){
            return res.status(400).json({
                message: 'Username is already taken.',
                success: false
            })
        }

        let emailTaken = await validateEmail(newUser.email);
        if(emailTaken){
            return res.status(400).json({
                message: 'Email is already taken.',
                success: false
            })
        }
        
        
        newUser.password = await newUser.encryptPassword(newUser.password);

        await newUser.save();
    
        /*const token = jwt.sign({_id: newUser._id}, SECRET_KEY);
        res.status(200).json({token: token})*/
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to create your account',
            success: false
        })
    }
    
}

//Login usuario
userController.singInUser = async (req, res) =>{
    const {username, password} = req.body;
    //Buscamos el usuario por el username
    const user = await User.findOne({username})

    if(!user) return res.status(404).json({
        message: 'Username is not found. Invalid login credentials',
        success: false
    });

    const validPassword = await user.validatePassword(password)
    if(!validPassword) return res.status(403).json({
        message: 'Incorrect password',
        success: false
    });   
   
    const accessToken = jwt.sign({_id: user._id, username: user.username, 
        email: user.email}, SECRET_KEY, {expiresIn: "15 min"});

    const refreshToken = jwt.sign({_id: user._id, username: user.username, 
        email: user.email}, REFRESH_KEY, {expiresIn: "1 days"});

    const result = {username: user.username, email: user.email, token: accessToken, refreshToken: refreshToken}
    res.status(200).json({
        ...result,
        message: 'You are now logged in!',
        success: true
    })
}

userController.refreshToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;
        
        const payload = jwt.verify(refreshToken, REFRESH_KEY);

        const user = await User.findById(payload._id);
        if(user){
            const accessToken = jwt.sign({_id: user._id, username: user.username, 
                email: user.email}, SECRET_KEY, {expiresIn: "15 min"}); 
            res.json({accessToken})
        }else{
            res.status(401).json({message: 'error 401'})
        }
    } catch (error) {
        res.status(500).json({message: 'Refresh token has expired'})
    }
        
    

}

userController.getUserByEmail = async (req, res) => {
    const {email} = req.params;
    const user = await User.find({email: email});
    res.json(user);
}

userController.getUserByUsername = async (req, res) => {
    const {username} = req.params;
    const user = await User.find({username: username});
    res.json(user);
}


module.exports = userController;