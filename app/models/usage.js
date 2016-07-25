var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var user = new User();

var UsageSchema = new Schema({
	usage : Number,
	date : Number,
  localId : Number,
	createdAt : Number,
	user : [{type: Schema.Types.Mixed }]
});

module.exports = mongoose.model('Usages',UsageSchema);
