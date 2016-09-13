var Goal = require('../models/goal');

exports.createGoal = function(goal,callback){
  goal.save(function(err,usg){
    callback(err,usg);
  });
}

exports.getAllGoals = function(callback){
  Goal.find(function(err,usages){
    callback(err,usages);
  })
}

exports.getGoals = function(email, date, callback){
  Goal.find({
    'user.email' : email,
    date :{
      $lt : Number(date)
    }
  },function(err, usages){

    callback(err, usages);

  }).sort({createdAt : 1});
}
