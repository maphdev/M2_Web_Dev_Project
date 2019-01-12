const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, movieslist: user.watchlist});
        });
  }
};

module.exports.addMovieToWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {watchlist: req.params.movie_id}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, message: "Movie added to watchlist!"});
        });
  }
};

module.exports.deleteMovieToWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id,  {$pull: {watchlist: req.params.movie_id}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, message: "Movie deleted from watchlist!"});
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
            if (err) {
              return res.status(500).send({success: false, message: err});
            }
            res.status(200).send({success: true, movieslist: user.favoritelist});
          });
  }
};

module.exports.addMovieToFavoritelist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {favoritelist: req.params.movie_id}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, message: "Movie added to favoritelist!"});
        });
  }
};

module.exports.deleteMovieToFavoritelist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id,  {$pull: {favoritelist: req.params.movie_id}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, message: "Movie deleted from favoritelist!"});
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
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, movieslist: user.seenlist});
        });
  }
};

module.exports.addMovieToSeenlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {seenlist: req.params.movie_id}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, message: "Movie added to seenlist!"});
        });
  }
};

module.exports.deleteMovieToSeenlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id,  {$pull: {seenlist: req.params.movie_id}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(200).send({success: true, message: "Movie deleted from favoritelist!"});
        });
  }
};
