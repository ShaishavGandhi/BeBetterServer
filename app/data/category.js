var Category = require('../models/category');

exports.createCategory = function(category,callback){
  category.save(function(err, cat){
    callback(err, cat);
  });
}

exports.getAllCategories = function(callback){
  Category.find(function(err, categories){
    callback(err, categories);
  })
}

exports.getCategories = function(category, callback){
  Category.find({
    'category' : {
      $regex : '.*' + category + '.*',
      $options : 'i'
    }
  },function(err, categories){

    callback(err, categories);

  }).sort({count : 1});
}
