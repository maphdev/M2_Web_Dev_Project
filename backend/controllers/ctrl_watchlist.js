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
  // check req arguments
  req.checkBody('id','Movie id is required').notEmpty();
  req.checkBody('id','Movie id should be an int').isInt();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: errors});
  }

  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {watchlist: parseInt(req.body.id)}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(201).send({success: true, message: "Movie added to watchlist!"});
        });
  }
};

module.exports.deleteMovieToWatchlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function (err, user) {
          if (!user.watchlist.includes(parseInt(req.params.movie_id))) {
            return res.status(404).send({success: false, message: "Movie not in watchlist"});
          }
          User.findByIdAndUpdate(req.payload._id,  {$pull: {watchlist: parseInt(req.params.movie_id)}}, {upsert: true})
              .exec(function(err, user) {
                if (err) {
                  return res.status(500).send({success: false, message: err});
                }
                res.status(200).send({success: true, message: "Movie deleted from watchlist!"});
              });
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
  // check req arguments
  req.checkBody('id','Movie id is required').notEmpty();
  req.checkBody('id','Movie id should be an int').isInt();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: errors});
  }

  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {favoritelist: parseInt(req.body.id)}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(201).send({success: true, message: "Movie added to favoritelist!"});
        });
  }
};

module.exports.deleteMovieToFavoritelist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function (err, user) {
          if (!user.favoritelist.includes(parseInt(req.params.movie_id))) {
            return res.status(404).send({success: false, message: "Movie not in favoritelist"});
          }
          User.findByIdAndUpdate(req.payload._id,  {$pull: {favoritelist: parseInt(req.params.movie_id)}}, {upsert: true})
              .exec(function(err, user) {
                if (err) {
                  return res.status(500).send({success: false, message: err});
                }
                res.status(200).send({success: true, message: "Movie deleted from favoritelist!"});
              });
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
  // check req arguments
  req.checkBody('id','Movie id is required').notEmpty();
  req.checkBody('id','Movie id should be an int').isInt();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: errors});
  }

  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {seenlist: parseInt(req.body.id)}}, {upsert: true})
        .exec(function(err, user) {
          if (err) {
            return res.status(500).send({success: false, message: err});
          }
          res.status(201).send({success: true, message: "Movie added to seenlist!"});
        });
  }
};

module.exports.deleteMovieToSeenlist = function (req, res) {
  // if no user ID exists in the JWT, return a 401
  if (!req.payload._id) {
    res.status(401).send({success: false, message: "UnauthorizedError: private profile"});
  } else {
    User.findById(req.payload._id)
        .exec(function (err, user) {
          if (!user.seenlist.includes(parseInt(req.params.movie_id))) {
            return res.status(404).send({success: false, message: "Movie not in seenlist"});
          }
          User.findByIdAndUpdate(req.payload._id,  {$pull: {seenlist: parseInt(req.params.movie_id)}}, {upsert: true})
              .exec(function(err, user) {
                if (err) {
                  return res.status(500).send({success: false, message: err});
                }
                res.status(200).send({success: true, message: "Movie deleted from seenlist!"});
              });
        });
  }
};
