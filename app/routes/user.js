var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');


router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.route('/')

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

module.exports = router;
