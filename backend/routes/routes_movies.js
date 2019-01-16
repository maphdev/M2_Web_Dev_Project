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

// (GET) /api/movies/:movie_id
router.get('/movies/:movie_id', ctrlMovies.getMovieDetails);

// (GET) /api/movies/:movie_id/videos
router.get('/movies/:movie_id/videos', ctrlMovies.getMovieVideos);

// (GET) /api/movies/:movie_id/reviews
router.get('/movies/:movie_id/reviews', ctrlMovies.getMovieReviews);

// (GET) /api/movies/:movie_id/recommendations
router.get('/movies/:movie_id/recommendations', ctrlMovies.getRecommendationMovies);


// Handle 405 error : method not allowed
const handler = require('../config/handler.js');

router.all('/movies/popular/:page_id', handler(['GET']));
router.all('/movies/top_rated/:page_id', handler(['GET']));
router.all('/movies/now_playing/:page_id', handler(['GET']));
router.all('/movies/upcoming/:page_id', handler(['GET']));

router.all('/movies/search/:search/:page_id', handler(['GET']));

router.all('/movies/:movie_id', handler(['GET']));
router.all('/movies/:movie_id/videos', handler(['GET']));
router.all('/movies/:movie_id/reviews', handler(['GET']));
router.all('/movies/:movie_id/recommendations', handler(['GET']));


module.exports = router;
