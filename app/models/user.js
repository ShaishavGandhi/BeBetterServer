var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
name : String,
email : String,
photo : String,
gcm_id : String,
createdAt : {  type: Date, default: Date.now},
});

module.exports = mongoose.model('Users',UserSchema);
