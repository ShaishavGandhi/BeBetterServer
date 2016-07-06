var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var user = new User();

var LessonSchema = new Schema({
	title : String,
	lesson : String,
	categories : [String],
	createdAt : Date,
	localId : Number,
	public : Boolean,
	user : [{type: Schema.Types.Mixed }]

});

module.exports = mongoose.model('Lessons',LessonSchema);