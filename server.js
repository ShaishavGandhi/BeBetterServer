// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// Setting up database connections
var mongoose = require('mongoose')
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.connect('mongodb://shaishgandhi:PinkFloyd786@ds011715.mlab.com:11715/bebetter',options);
// mongoose.connect('mongodb://localhost:27017/bebetter')

var User = require('./app/models/user');
var Lesson = require('./app/models/lesson')

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the user name (comes from the request)
        user.email = req.body.email;
        user.photo = req.body.photo;
        user.createdAt = new Date().getTime();

        // save the user and check for errors
        user.save(function(err) {
        	if (err)
        		res.send(err);

        	res.json({ message: 'User created!' });
        });
        
    })

    .get(function(req,res){
    	User.find(function(err,users){
    		if(err)
    			res.send(err)
    		else
    			res.json(users)
    	});

    });

    router.route('/lessons')

    .post(function(req,res){

    	var lesson = new Lesson();
    	lesson.title = req.body.title;
    	lesson.lesson = req.body.lesson;
    	var arr = req.body.categories.split(',');
    	lesson.categories = arr;
    	lesson.public = req.body.public;
    	lesson.createdAt = Number(req.body.createdAt);
    	lesson.localId = parseInt(req.body.localId);

    	User.find({"email" : req.body.email},function(err,usr){
    		if(err)
    			res.send(err);
    		lesson.user = usr;
    		lesson.save(function(err,less){
    			if(err)
    				res.send(err);

    			res.json({
    				message : 'Lesson created',
    				lesson : less
    			});
    		})
    	})	

    })

    .get(function(req,res){
    	Lesson.find(function(err,lessons){
    		if(err)
    			res.send(err)
    		res.send(lessons)
    	})

    });

    router.route('/lessons/:email/:createdAt')

    .get(function(req,res){
    	Lesson.find({
    		'user.email' : req.params.email, 
    		createdAt :{
    			$gt : Number(req.params.createdAt)
    		}
    	},function(err,lessons){
    		if(err)
    			res.send(err)
    		res.json(lessons)
    	})

    })



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);