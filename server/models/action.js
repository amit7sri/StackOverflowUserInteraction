var mongoose = require('mongoose');

// Log Schema
var ActionSchema = mongoose.Schema({
	username: {
		type: String
	},
	action: {
		type: String
	},
	timestamp: {
		type: Date,
		default: Date.now()
	}
});

var ActionLog = module.exports = mongoose.model('ActionLog', ActionSchema);

module.exports.createAction = function(newAction, callback){
	newAction.save(callback);
};
