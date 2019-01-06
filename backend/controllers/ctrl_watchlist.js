const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          res.status(200).send(user.watchlist.getMovielist());
        });
  }
};

module.exports.addMovieToWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          user.watchlist.addMovie(req.params.movie_id);
          res.status(200).send();
        });
  }
};

module.exports.deleteMovieToWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          user.watchlist.removeMovie(req.params.movie_id);
          res.status(200).send();
        });
  }
};

module.exports.getFavoritelist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
      User.findById(req.payload._id)
          .exec(function(err, user) {
            res.status(200).send(user.favoritelist.getMovielist());
          });
  }
};

module.exports.addMovieToFavoritelist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          user.favoritelist.addMovie(req.params.movie_id);
          res.status(200).send();
        });
  }
};

module.exports.deleteMovieToFavoritelist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          user.favoritelist.removeMovie(req.params.movie_id);
          res.status(200).send();
        });
  }
};

module.exports.getSeenlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          res.status(200).send(user.seenlist.getSeenlist());
        });
  }
};

module.exports.addMovieToSeenlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          user.seenlist.addMovie(req.params.movie_id);
          res.status(200).send();
        });
  }
};

module.exports.deleteMovieToSeenlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          user.seenlist.removeMovie(req.params.movie_id);
          res.status(200).send();
        });
  }
};
