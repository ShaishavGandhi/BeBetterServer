var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');
var Usage = require('../models/usage');


router.route('/')

.post(function(req,res){

  var usage = new Usage();
  usage.usage = req.body.usage;
  usage.date = req.body.date;

  User.find({"email" : req.body.email},function(err,usr){
    if(err)
    res.send(err);
    usage.user = usr;
    usage.save(function(err,less){
      if(err)
      res.send(err);

      res.json({
        message : 'Usage created',
        lesson : less
      });
    })
  })

})

.get(function(req,res){
  Usage.find(function(err,lessons){
    if(err)
    res.send(err)
    res.send(lessons)
  })

});

router.route('/:email/:date')

.get(function(req,res){
  Usage.find({
    'user.email' : req.params.email,
    date :{
      $lt : Number(req.params.date)
    }
  },function(err,lessons){
    if(err)
    res.send(err)
    res.json(lessons)
  }).sort({createdAt : 1});

})

module.exports = router;
