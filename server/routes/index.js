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

var series;

router.get('/uservsall', function(req, res){
    getUvsData(function(result){
    	res.setHeader('Content-Type', 'application/json');
    	console.log("*****chu *****logindata***********");
        console.log(series);
    	res.send(JSON.stringify(series));
    }); 
});

var alldata;
function getUvsData(callback){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = {};
	  db.collection("actionlogs").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    console.log("******************getUvsData***********fk**********");
	    alldata = result;

	    var aup = 0;
	    var adown = 0;
	    var afav = 0;
	    var ashare = 0;

	    var bup = 0;
	    var bdown = 0;
	    var bfav = 0;
	    var bshare = 0;

	    for(var x in alldata){
			var each = alldata[x];

			if(each.username==username && each.action == 'upvoted') aup=aup+1;
			if(each.username==username && each.action == 'downvoted') adown=adown+1;
			if(each.username==username && each.action == 'favourite') afav=afav+1;
			if(each.username==username && each.action == 'clickshare') ashare=ashare+1;
			
			if(each.username!==username && each.action == 'upvoted') bup=bup+1;
			if(each.username!==username && each.action == 'downvoted') bdown=bdown+1;
			if(each.username!==username && each.action == 'favourite') bfav=bfav+1;
			if(each.username!==username && each.action == 'clickshare') bshare=bshare+1;
		}

		series = [{
            name: username,
            data: [-+aup, -+adown, -+afav, -+ashare]
        }, {
            name: 'All',
            data: [bup, bdown, bfav, bshare]
        }];
	    callback(result);
	    db.close();
	  });
	});
}

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