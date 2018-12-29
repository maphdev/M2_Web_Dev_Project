var request = require('request');

const MOVIES_BASE_URL = "https://api.themoviedb.org/3";

const SEARCH = "/search";
const MOVIES = "/movie";

const POPULAR_SORT = "/popular";
const TOP_RATED_SORT = "/top_rated";
const NOW_PLAYING = "/now_playing";
const UPCOMING = "/upcoming";

const API_KEY = "9fc446524a3b5ebc71d910572efa87c8";

module.exports.getPopularMovies = function (req, res) {
  request({
    uri: MOVIES_BASE_URL + MOVIES + POPULAR_SORT,
    qs: {
      api_key: API_KEY,
      page: req.params.page_id
    }
  }).pipe(res);
};

module.exports.getTopRatedMovies = function (req, res) {
  request({
    uri: MOVIES_BASE_URL + MOVIES + TOP_RATED_SORT,
    qs: {
      api_key: API_KEY,
      page: req.params.page_id
    }
  }).pipe(res);
};

module.exports.getNowPlayingMovies = function (req, res) {
  request({
    uri: MOVIES_BASE_URL + MOVIES + NOW_PLAYING,
    qs: {
      api_key: API_KEY,
      page: req.params.page_id
    }
  }).pipe(res);
};

module.exports.getUpcomingMovies = function (req, res) {
  request({
    uri: MOVIES_BASE_URL + MOVIES + UPCOMING,
    qs: {
      api_key: API_KEY,
      page: req.params.page_id
    }
  }).pipe(res);
};

module.exports.getSearchedMovies = function (req, res) {
  request({
    uri: MOVIES_BASE_URL + SEARCH + MOVIES,
    qs: {
      api_key: API_KEY,
      query: req.params.search,
      page: req.params.page_id
    }
  }).pipe(res);
};

module.exports.getMovieDetails = function (req, res) {
  request({
    uri: MOVIES_BASE_URL + MOVIES + "/" + req.params.movie_id,
    qs: {
      api_key: API_KEY
    }
  }).pipe(res);
};
