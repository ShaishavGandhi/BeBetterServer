var Usage = require('../models/usage');

exports.createUsage = function(usage,callback){
  usage.save(function(err,usg){
    callback(err,usg);
  });
}

exports.getAllUsages = function(callback){
  Usage.find(function(err,usages){
    callback(err,usages);
  })
}

exports.getUsages = function(email, date, callback){
  Usage.find({
    'user.email' : email,
    date :{
      $lt : Number(date)
    }
  },function(err, usages){

    callback(err, usages);

  }).sort({createdAt : 1});
}
