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
var goalRoutes = require('./app/routes/goal');
var quoteRoutes = require('./app/routes/quote');
var scheduler = require('./app/scheduler/scheduler');
var mongoose = require('mongoose');
var gcm = require('node-gcm');
var morgan = require('morgan')




var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// Setting up database connections
mongoose.connect('mongodb://shaishgandhi:PinkFloyd786@ds011715.mlab.com:11715/bebetter',options);


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('combined'))

var port = process.env.PORT || 8080;        // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/users', userRoutes);
app.use('/api/lessons',lessonRoutes);
app.use('/api/usages',usageRoutes);
app.use('/api/quotes',quoteRoutes);
app.use('/api/goals', goalRoutes);

scheduler.startQuoteScheduler();

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
