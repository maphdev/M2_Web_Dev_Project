const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function (req, res) {
  // create a new Mongoose model instance with the forms' data, and
  // call the setPassword method to add the salt and the hash to the instance
  var user = new User();
  console.log(req.body);
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  // save the instance as a record to the database
  user.save(function (err) {
    // generate a JWT
    let token = user.generateJWT();
    res.status(200);

    // send the JWT inside the JSON response
    res.json({
      "token": token
    });
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
