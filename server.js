// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var userRoutes = require('./app/routes/user');
var lessonRoutes = require('./app/routes/lesson');
var usageRoutes = require('./app/routes/usage');
var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// Setting up database connections
mongoose.connect('mongodb://shaishgandhi:PinkFloyd786@ds011715.mlab.com:11715/bebetter',options);


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/users', userRoutes);
app.use('/api/lessons',lessonRoutes);
app.use('/api/usages',usageRoutes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
