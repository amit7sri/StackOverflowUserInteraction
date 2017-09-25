var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/amitDB";

var express = require('express');
var router = express.Router();

var username;
var loginhistory;
var actionhistory;

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	username = req.user.username;

	getLoginHistory();
	getActionHistory();
	res.render('index', {username: username, 
						loginhistory:JSON.stringify(loginhistory) , 
						actionhistory: JSON.stringify(actionhistory)}); 
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		username = req.user.username;
		console.log('ensureAuthenticated    '  + req.user.username);
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

function getLoginHistory() {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { username: username};
	  db.collection("loginlogs").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    loginhistory = result;
	    console.log(result);
	    db.close();
	  });
	});
}

function getActionHistory() {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { username: username};
	  db.collection("actionlogs").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    actionhistory = result;
	    console.log(result);
	    db.close();
	  });
	});
}

module.exports = router;