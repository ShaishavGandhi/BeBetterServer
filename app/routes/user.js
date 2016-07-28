var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');
var userData = require('../data/user');


router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.route('/')

.post(function(req, res) {

  var user = new User();      // create a new instance of the User model
  user.name = req.body.name;  // set the user name (comes from the request)
  user.email = req.body.email;
  user.photo = req.body.photo;
  user.createdAt = new Date().getTime();

  // save the user and check for errors

  userData.createUser(user,function(err){
    if(err){
      res.send(err)
    }

    res.json({message : 'User created!'});
  })

})

.get(function(req,res){

  userData.getAllUsers(function(err,users){
    if(err){
      res.send(err);
    }
    res.json(users)
  })

});

module.exports = router;
