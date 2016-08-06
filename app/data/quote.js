var Quote = require('../models/quote');


exports.getRandomQuote = function(callback){
  Quote.findOne({"used" : false},function(err,res){
    callback(err,res);
  })
};

exports.saveQuote = function(quote,callback){
  quote.save(function(err,quote){
    callback(err,quote);
  })
};

exports.getAllQuotes = function(callback){
  Quote.find(function(err,quotes){
    callback(quote);
  })
}

exports.setAsUsed = function(quote,callback){
  quote.used = true;
  quote.save(function(err,res){
    callback(err,res);
  })
}
