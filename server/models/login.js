var mongoose = require('mongoose');

// Logs Schema
var LoginSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	timespamp: {
		type: Date,
		default: Date.now
	}
});

var LoginLog = module.exports = mongoose.model('LoginLog', LoginSchema);

module.exports.createLogin = function(newLogin, callback){
	newLogin.save(callback);
};