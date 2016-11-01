var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
	category : String,
	count : Number,
});

module.exports = mongoose.model('Categories', CategorySchema);
