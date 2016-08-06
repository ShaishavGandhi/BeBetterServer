var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
photo : String,
quote : String,
author : String,
used : Boolean,
createdAt : {  type: Date, default: Date.now},
});

module.exports = mongoose.model('Quote', QuoteSchema);
