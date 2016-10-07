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
  user.gcm_id = req.body.gcm_id;
  user.createdAt = new Date().getTime();

  // save the user and check for errors
  userData.getUserByEmail(user.email, function(err, existingUser){
    if(existingUser == null){
      console.log("Entered creation");
      userData.createUser(user, function(error, newUser){

        console.log(error);
        console.log(newUser);
        if(error){
          res.send(err)
        }

        res.json({
          action : "SUCESS",
          response : newUser
        });
      })
    }
    else{
      res.send({
        action : "SUCCESS",
        response : existingUser
      })
    }
  })
})

.get(function(req,res){

  userData.getAllUsers(function(err,users){
    if(err){
      res.send(err);
    }
    res.json({
      action : "SUCESS",
      response : users
    })
  })

});

router.route('/update')
.post(function(req,res){

  var email = req.body.email;
  var gcm_id = req.body.gcm_id;

  userData.getUserByEmail(email,function(err,user){
    if(err)
    res.send(err)

    user.gcm_id = gcm_id;
    userData.updateGcmId(user,function(err,usr){
      if(err){
        res.send(err);
      }
      res.json({
        action : "SUCCESS",
        response : usr
      });
    })
  })

})

module.exports = router;
