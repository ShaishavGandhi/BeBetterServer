var express = require('express');        // call express
var router = express.Router();              // get an instance of the express Router
var Quote = require('../models/quote');
var quoteData = require('../data/quote');

router.route('/')

.post(function(req,res){

  var quote = new Quote();
  quote.photo = req.body.photo;
  quote.quote = req.body.quote;
  quote.used = false;
  quote.author = req.body.author;

  quoteData.saveQuote(quote,function(err,quote){
    if(err)
      res.send(err);
    res.json({
      message : "Quote created",
      quote : quote
    });
  });

})

.get(function(req,res){
  quoteData.getAllQuotes(function(err,quotes){
    if(err)
      res.send(err);
    res.send(quotes);
  })

});

module.exports = router;
