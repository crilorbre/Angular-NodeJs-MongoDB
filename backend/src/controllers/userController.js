const userController = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');



userController.signUpUser = async (req, res) =>{
    const {email, password, username, firstName, lastName} = req.body;
    const newUser = new User({email, password, username, firstName, lastName});
    
    newUser.password = await newUser.encryptPassword(newUser.password);

    await newUser.save();
   
    const token = jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token: token})
}

userController.singInUser = async (req, res) =>{
    const {email, password} = req.body;
    //Buscamos el usuario por el correo
    const user = await User.findOne({email})

    if(!user) return res.status(401).send("The email doesn't exist");

    const validPassword = await user.validatePassword(password)
    if(!validPassword) return res.status(401).send("Wrong password");   
   
    const token = jwt.sign({_id: user._id}, 'secretkey');
    res.status(200).json({token: token})
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