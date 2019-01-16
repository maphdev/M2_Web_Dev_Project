const express = require('express');
const router = express.Router();
const ctrl_watchlist = require('../controllers/ctrl_watchlist');
const auth = require('../controllers/ctrl_authentication').auth;

// (GET) /api/movielist/watchlist - to return the user's watchlist
router.get('/movielist/watchlist', auth, ctrl_watchlist.getWatchlist);
// (PUT) /api/movielist/watchlist/ - to add a movie (by it's id) to the user's watchlist
router.put('/movielist/watchlist/', auth, ctrl_watchlist.addMovieToWatchlist);
// (DELETE) /api/movielist/watchlist/:movie_id - to remove a movie (by it's id) to the user's watchlist
router.delete('/movielist/watchlist/:movie_id', auth, ctrl_watchlist.deleteMovieToWatchlist);

// (GET) /api/movielist/favoritelist - to return the user's favoritelist
router.get('/movielist/favoritelist', auth, ctrl_watchlist.getFavoritelist);
// (PUT) /api/movielist/favoritelist/ - to add a movie (by it's id) to the user's favoritelist
router.put('/movielist/favoritelist/', auth, ctrl_watchlist.addMovieToFavoritelist);
// (DELETE) /api/movielist/favoritelist/:movie_id - to remove a movie (by it's id) to the user's favoritelist
router.delete('/movielist/favoritelist/:movie_id', auth, ctrl_watchlist.deleteMovieToFavoritelist);

// (GET) /api/movielist/seenlist - to return the user's seenlist
router.get('/movielist/seenlist', auth, ctrl_watchlist.getSeenlist);
// (PUT) /api/movielist/seenlist/  - to add a movie (by it's id) to the user's seenlist
router.put('/movielist/seenlist/', auth, ctrl_watchlist.addMovieToSeenlist);
// (DELETE) /api/movielist/seenlist/:movie_id - to remove a movie (by it's id) to the user's seenlist
router.delete('/movielist/seenlist/:movie_id', auth, ctrl_watchlist.deleteMovieToSeenlist);


// Handle 405 error : method not allowed
const handler = require('../config/handler.js');

router.all('/movielist/watchlist', handler(['GET', 'PUT']));
router.all('/movielist/watchlist/:movie_id', handler(['DELETE']));

router.all('/movielist/favoritelist', handler(['GET', 'PUT']));
router.all('/movielist/favoritelist/:movie_id', handler(['DELETE']));

router.all('/movielist/seenlist', handler(['GET', 'PUT']));
router.all('/movielist/seenlist/:movie_id', handler(['DELETE']));


module.exports = router;
