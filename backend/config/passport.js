const passport = require('passport');
const LocalStrat = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrat({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({email: username}, (err, user) => {
      if (err) {
        return done(err);
      }
      // user not found in db
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // credentials are correct, return the user object
      return done(null, user);
    });
  }
));
