const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
let app = express();

// Bring the database and models
require('./model/db');
// Bring the passport config, and initialize
require('./config/passport');

// Init parameters
var corsOptions = {
    origin: '*',
    credentials: true };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(expressValidator())
app.use(passport.initialize());

// Import routes
let routesAuthentication = require('./routes/routes_authentication');
app.use('/api/', routesAuthentication);

let routesMovies = require('./routes/routes_movies');
app.use('/api/', routesMovies);

let routesWatchlist = require('./routes/routes_watchlist');
app.use('/api/', routesWatchlist);

// Catch 404 and forward to error handler
app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  res.status(404).send({success: false, message: err});
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError')
    res.status(401).send({success: false, message: err});
  else if (err.name === 'SyntaxError')
    res.status(400).send({success: false, message: err});
  else
    next(err);
});

app.listen(4000, () => console.log(`Express server running on port 4000`));
