var User = require('../app/models/user');
var express = require('express');  
var router = express.Router();   

router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the user name (comes from the request)
        user.email = req.body.email;
        user.photo = req.body.photo;

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

    })



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here