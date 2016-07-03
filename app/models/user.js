var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
name : String,
email : String,
photo : String,
createdAt : Date,
});

module.exports = mongoose.model('Users',UserSchema);
