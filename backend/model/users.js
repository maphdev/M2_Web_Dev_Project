

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovielistModel = require('./movielist');

// The hash and salt will be used instead of saving a password.
// The salt is a string of characters unique to each user.
// The hash is created by combining the password provided by the user and the
// salt, and then applying one-way encryption.
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,

  watchlist: MovielistModel,
  favoritelist: MovielistModel,
  seenlist: MovielistModel
});

// We use Mongoose schema methods to do the settings and the checking of the
// password. They use the Node.js crypto module : randomBytes to create the
// random salt and pbkdf2Sync to create the hash.
const crypto = require('crypto');

// Set the password (when creating a user).
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// Check the password (encrypt the salt and the password and see if the output
// matches the stored hash)
UserSchema.methods.isValidPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash == hash;
};

// We use the jsonwebtoken module to generate a JWT token. This module expose a
// sign method that we can use to create a JWT, by passing it the data we want
// to include in the token, plus a secret that the hashing algorithm will use.
const jwt = require('jsonwebtoken');

// Generate a JSON Web Token (when a user registers and logs in).
UserSchema.methods.generateJWT = function () {
  var expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiryDate.getTime() / 1000)
  }, "THE_SECRET");
};

mongoose.model('User', UserSchema);
