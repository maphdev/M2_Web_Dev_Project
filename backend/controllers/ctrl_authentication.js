const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('express-jwt');

module.exports.auth = jwt({
  secret: 'THE_SECRET',
  userProperty: 'payload'
});

module.exports.register = function (req, res) {
  // check req arguments
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('password','Password is required').notEmpty();
  req.checkBody('password','Password must contain at least 6 characters').isLength({min:6});

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: errors});
  }

  // create a new Mongoose model instance with the forms' data, and
  // call the setPassword method to add the salt and the hash to the instance
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  // save the instance as a record to the database
  user.save(function (err) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(409).send({succes: false, message: 'User already exist!' });
      }
      return res.status(500).send(err);
    }

    // generate a JWT
    let token = user.generateJWT();

    // send the JWT inside the JSON response
    res.status(200).send({success: true, "token": token});
  });
};

module.exports.login = function (req, res) {
  // check req arguments
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('password','Password is required').notEmpty();
  req.checkBody('password','Password must contain at least 6 characters').isLength({min:6});

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: errors});
  }

  // passport authentication with config

  passport.authenticate('local', function (err, user, info) {
    // passport throws/catch an error
    if (err) {
      res.status(404).send({success: false, message: err});
    }

    // a user is found
    if (user) {
      // generate a JWT
      let token = user.generateJWT();

      // send the JWT inside the JSON response
      res.status(200).send({success: true, "token": token});
    } else {
      // user is not found
      res.status(401).send({success: false, message: info});
    }
  })(req, res);

};

module.exports.getProfile = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    // otherwise continue
    User.findById(req.payload._id)
      .exec(function(err, user) {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send({success: true, user: user});
      });
  }
};

// we still need to validate forms inputs !
