const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function (req, res) {
  // check req arguments
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('password','Password is required').notEmpty();
  req.checkBody('password','Password must contain at least 6 characters').isLength({min:6});

  let errors = req.validationErrors();

  if (errors) {
    return res.status(422).send({success: false, message: errors});
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
        return res.status(500).send({succes: false, message: 'User already exist!' });
      }
      return res.status(500).send(err);
    }
    
    // generate a JWT
    let token = user.generateJWT();

    // send the JWT inside the JSON response
    res.status(200).send({success: true, "token": token})
  });
};

module.exports.login = function (req, res) {
  console.log("LOGIN !!!");
  res.status(200);
  res.json({
    "message" : "Login done"
  });
};

module.exports.getProfile = function (req, res) {
  console.log("PROFILE !!!");
  res.status(200);
  res.json({
    "message" : "Profile done"
  });
};

// we still need to validate forms inputs !
