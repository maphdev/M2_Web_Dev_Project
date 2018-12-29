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

// Catch 404 and forward to error handler
app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found');
  err.statusCode = 404;
  next(err);
});

app.listen(4000, () => console.log(`Express server running on port 4000`));
