var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var user = new User();

var GoalSchema = new Schema({
	goal : Number,
	date : Number,
  localId : Number,
	createdAt : Number,
	user : {type: Schema.Types.Mixed }
});

module.exports = mongoose.model('Goals', GoalSchema);
