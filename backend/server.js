const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

// Bring the database and models
require('./model/db');
// Bring the passport config, and initialize
require('./config/passport');

// init parameters
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// import routes
let routesAuthentication = require('./routes/routes_authentication');
app.use('/api/', routesAuthentication);

app.listen(4000, () => console.log(`Express server running on port 4000`));
