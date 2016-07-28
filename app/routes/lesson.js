var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');
var Lesson = require('../models/lesson');
var userData = require('../data/user');
var lessonData = require('../data/lesson');


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

  userData.getUserByEmail(req.body.email,function(err,user){
    if(err)
      res.send(err);

    lesson.user = user;

    lessonData.createLesson(lesson,function(err,less){
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
  lessonData.getAllLessons(function(err,lessons){
    if(err)
    res.send(err)
    res.send(lessons)
  })

});

router.route('/:email/:createdAt')

.get(function(req,res){
  lessonData.getLessons(req.params.email, req.params.createdAt, function(err,lessons){
    if(err)
      res.send(err)

    res.send(lessons);
  })

})

module.exports = router;
