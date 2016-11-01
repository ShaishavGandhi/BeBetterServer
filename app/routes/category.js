var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var categoryData = require('../data/category');
var Category = require('../models/category');

router.route('/')

.post(function(req,res){
  var category = new Category();
  category.category = req.body.category;
  category.count = 1; 

  categoryData.createCategory(category, function(error, category){
    if(error){
      res.send(error);
    }

    res.send({
      action : 'SUCCESS',
      response : category
    })
  })
})

.get(function(req,res){
  categoryData.getAllCategories(function(err,usages){
    if(err)
      res.send(err);
    res.json({
      action : "SUCCESS",
      response : usages
    });
  });

});

router.route('/search')

.get(function(req,res){

  categoryData.getCategories(req.param("query"), function(err, categories){

    if (err) {
      res.send(err);
    }
    res.json({
      action : "SUCCESS",
      response : categories
    });

  })

})

module.exports = router;
