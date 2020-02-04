const User = require('../models/User')
const { SECRET_KEY } = require('../config/index') 
const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

module.exports = (passport) => {
    passport.use(new Strategy(opts, async(payload, done) => {
        await User.findById(payload._id).then(async user => {
            if(user){
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => {
            return done(null, false);
        });
    }))
}