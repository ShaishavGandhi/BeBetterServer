var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var User = require('../models/user');
var Goal = require('../models/goal');
var userData = require('../data/user');
var goalData = require('../data/goal');

router.route('/')

.post(function(req,res){

  var goal = new Goal();
  goal.goal = req.body.goal;
  goal.date = req.body.date;
  goal.localId = parseInt(req.body.localId);
  goal.createdAt = new Date().getTime();


  userData.getUserByEmail(req.body.email,function(err,user){
    if(err){
      res.send(err);
    }

    goal.user = user;

    goalData.createGoal(goal,function(err,usg){
      if(err){
        res.send(err)
      }

      res.json({
        message : 'Goal created',
        goal : usg
      });
    })
  })

})

.get(function(req,res){
  goalData.getAllGoals(function(err,usages){
    if(err)
      res.send(err);
    res.json(usages);
  });

});

router.route('/:email/:date')

.get(function(req,res){

  goalData.getGoals(req.params.email, req.params.date, function(err, usages){

    if(err)
      res.send(err);
    res.json(usages);

  })

})

module.exports = router;
