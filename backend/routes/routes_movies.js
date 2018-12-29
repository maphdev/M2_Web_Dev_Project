const express = require('express');
const router = express.Router();
const ctrlMovies = require('../controllers/ctrl_movies');

// -> GET PAGES OF MOVIES BY CATEGORY

// (GET) /api/movies/popular/:page_id
router.get('/movies/popular/:page_id', ctrlMovies.getPopularMovies);

// (GET) /api/movies/top_rated/:page_id
router.get('/movies/top_rated/:page_id', ctrlMovies.getTopRatedMovies);

// (GET) /api/movies/now_playing/:page_id
router.get('/movies/now_playing/:page_id', ctrlMovies.getNowPlayingMovies);

// (GET) /api/movies/upcoming/:page_id
router.get('/movies/upcoming/:page_id', ctrlMovies.getUpcomingMovies);

// -> GET PAGES OF MOVIES BY SEARCH

// (GET) /api/movies/:search/:page_id
router.get('/movies/search/:search/:page_id', ctrlMovies.getSearchedMovies);

// -> GET MOVIES' DETAILS

// (GET) /api/movie/:movie_id
router.get('/movie/:movie_id', ctrlMovies.getMovieDetails);

module.exports = router;
