var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');
var Usage = require('../models/usage');
var userData = require('../data/user');
var usageData = require('../data/usage');

router.route('/')

.post(function(req,res){

  var usage = new Usage();
  usage.usage = req.body.usage;
  usage.date = req.body.date;
  usage.localId = parseInt(req.body.localId);
  usage.createdAt = new Date().getTime();


  userData.getUserByEmail(req.body.email,function(err,user){
    if(err){
      res.send(err);
    }

    usage.user = user;

    usageData.createUsage(usage,function(err,usg){
      if(err){
        res.send(err)
      }

      res.json({
        action : 'SUCCESS',
        usage : usg
      });
    })
  })

})

.get(function(req,res){
  usageData.getAllUsages(function(err,usages){
    if(err)
      res.send(err);
    res.json({
      action : "SUCCESS",
      response : usages
    });
  });

});

router.route('/:email/:date')

.get(function(req,res){

  usageData.getUsages(req.params.email, req.params.date, function(err, usages){

    if(err)
      res.send(err);
    res.json({
      action : "SUCCESS",
      response : usages
    });

  })

})

module.exports = router;
