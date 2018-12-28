const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// init parameters
const app = express();
app.use(cors());
app.use(bodyParser.json());

// import debug
const db = require('./model/db');

// import routes
let routesAuthentication = require('./routes/routes_authentication');
app.use('/api/', routesAuthentication);

app.listen(4000, () => console.log(`Express server running on port 4000`));
