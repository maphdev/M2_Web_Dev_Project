
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// A simple list of movies:
// Movie are keep in the list with their respective id from moviedb.
const MovielistSchema = new Schema({
  movielist: [String];
});

// Add a movie to the list, using it's id.
// return true if it's added or else false.
MovielistSchema.methods.add = function (movie_id) {
  if(!(this.movielist.contain(movie_id))) {
    this.movielist.push(movie_id);
    return true;
  }
  return false;
};

// remove the movie from the list, using it's id.
// return true if it's removed or else false.
MovielistSchema.methods.remove = function (movie_id) {
  if (array.indexOf(movie_id) > -1) {
    this.movielist.splice(index, 1);
    return true
  }
  return false
};

// Return the whole list of movie
MovielistSchema.methods.getMovielist = function () {
  return this.movielist;
};

mongoose.model('Movielist', UserSchema);
