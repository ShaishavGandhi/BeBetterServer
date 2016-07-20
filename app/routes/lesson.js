var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');
var Lesson = require('../models/lesson');


router.route('/')

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

router.route('/:email/:createdAt')

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
  }).sort({createdAt : 1});

})

module.exports = router;
