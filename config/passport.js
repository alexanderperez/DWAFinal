// code based on https://scotch.io/tutorials/easy-node-authentication-google
//           and https://www.danielgynn.com/node-auth-part2/
//           and http://passportjs.org/docs/google
// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({ 'google.id': profile.id }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));

};
