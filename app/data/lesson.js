var Lesson = require('../models/lesson');

exports.createLesson = function(lesson,callback){
  lesson.save(function(err,less){
    callback(err,less);
  })
}

exports.getAllLessons = function(callback){
  Lesson.find(function(err,res){
    callback(err,res);
  })
}

exports.getLessons = function(email, createdAt, callback){
  Lesson.find({
    'user.email' : email,
    createdAt :{
      $gt : Number(createdAt)
    }
  },function(err,lessons){
    callback(err,lessons);
  }).sort({createdAt : 1});
}
