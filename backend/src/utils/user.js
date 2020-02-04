const User = require('../models/User')

const validateUsername = async (username)=>{
    let user = await User.findOne({username});
    return user ? true: false;
}

const validateEmail = async (email)=>{
    let user = await User.findOne({email});
    return user ? true: false;
}

const serializeUser = user => {
    return {
        username: user.username,
        email: user.username, 
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

module.exports = {
    validateEmail, 
    validateUsername,
    serializeUser
}