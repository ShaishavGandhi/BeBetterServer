var User = require('../models/user');
Object.prototype.hasOwnProperty = function(property) {
    return this[property] !== undefined;
};

exports.getOneGcm = function(callback){
  User.findOne({"email" : "shaishavgandhi05@gmail.com"},function(err,res){
    var gcm_ids = [];
    gcm_ids.push(res.gcm_id);
    callback(err,gcm_ids)
  })
}

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

exports.getAllGcmIds = function(callback){
  User.find(function(err,objs){
    var gcm_ids = [];
    console.log(objs.length)
    for(var i = 0; i < objs.length; i++)
    {
      if(objs[i].hasOwnProperty("gcm_id"))
        gcm_ids.push(objs[i].gcm_id);
    }
    callback(err,gcm_ids);
  });
}

exports.getUserByEmail = function(email,callback){
  User.findOne({"email" : email }, function(err, user){
    callback(err,user)
  })
}

exports.updateGcmId = function(user,callback){
  user.save(function(err,usr){
    callback(err,usr);
  })

}
