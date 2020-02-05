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
                
                //Expired in
                const actualDate = new Date().valueOf();
                const expiredTokenDate = new Date(0).setUTCSeconds(payload.exp).valueOf();

                if(expiredTokenDate > actualDate){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
                
            }
            return done(null, false);
        }).catch(err => {
            return done(null, false);
        });
    }))
}