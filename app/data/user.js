var User = require('../models/user');

exports.createUser = function(user,callback){
  user.save(function(err){
    callback(err);
  })
}

exports.getAllUsers = function(callback){
  User.find(function(err,users){
    callback(err,users);
  });
}

exports.getUserByEmail = function(email,callback){
  User.findOne({"email" : email }, function(err, user){
    callback(err,user)
  })
}

exports.updateGcmId = function(user,callback){

  console.log(user.gcm_id)
  user.save(function(err,usr){
    callback(err,usr);
  })

}
