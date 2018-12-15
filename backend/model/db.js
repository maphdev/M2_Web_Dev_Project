const mongoose = require('mongoose');

// db parameters
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
const dbURL = 'mongodb://username:Password1@ds251902.mlab.com:51902/series-app';

// create the database connection
mongoose.connect(dbURL, options);

// CONNECTION EVENTS
// when successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURL);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// SCHEMAS & MODELS
// require (./mymodel');
