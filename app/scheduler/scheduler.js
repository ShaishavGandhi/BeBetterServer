var gcm = require('node-gcm');
var userData = require('../data/user');
var quoteData = require('../data/quote');


// Set up the sender with you API key, prepare your recipients' registration tokens.
var sender = new gcm.Sender('AIzaSyCdvqRAUYoohhmaj4NFcMeAczk5FcuAo8k');

var message = new gcm.Message({
    data: { key1: 'Shaishav' }
});

exports.startQuoteScheduler = function(){
  setInterval(function(){
    sendQuote();
  },1000*60*60*24);
}


function sendQuote(){
  userData.getAllGcmIds(function(err,objs){
    var regTokens = objs;

    quoteData.getRandomQuote(function(err,quote){
      if(quote==null)
        return;

      var message = new gcm.Message({
        data : quote
      });

      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if(err)
          console.error(err);
        else
          console.log(response);
      });

      quoteData.setAsUsed(quote,function(err,res){});

    })

  })
}
