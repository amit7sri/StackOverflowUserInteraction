var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/amitDB";

var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('analytics'); 
});

//var test = [{"name":"upvote","data":3.0},{"name":"downvote","data":2.0}, {"name":"favourite","data":3.5},{"name":"scroll down","data":1.5}, {"name":"share","data":1.5}]


var actiondata; 
//Get action data from mongoDB
router.get('/data', function(req, res){
    getData(function(result){
    	res.setHeader('Content-Type', 'application/json');
    	console.log("***********respnse***********");
    	res.send(JSON.stringify(actiondata));
    }); 
});


var userdate;

router.get('/userdata', function(req, res){
    getData(function(result){
    	res.setHeader('Content-Type', 'application/json');
    	console.log("***********userdata***********");
        console.log(userdate);
    	res.send(JSON.stringify(userdate));
    }); 
});

var logdata;
router.get('/logindata', function(req, res){
    getLogData(function(result){
    	res.setHeader('Content-Type', 'application/json');
    	console.log("*****chu *****logindata***********");
        console.log(logdata);
    	res.send(logdata);
    }); 
});

function getLogData(callback){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = {};
	  //var query = [{"$group": {_id: {user: "$username", year: {"$year": "$timestamp"}, month: {"$month": "$timestamp"},day: {"$dayOfMonth": "$timestamp"}}, count: {"$sum": 1 }}}, { $sort: { _id: 1}}];
	  db.collection("loginlogs").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    logdata = result;
	    console.log("******************logdata***********fk**********");
	    console.log(logdata);

	    for(var x in logdata){
	    	var each = logdata[x];
	    }


	    callback(result);
	    db.close();
	  });
	});
}

function getData(callback){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { };
	  db.collection("actionlogs").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    
	    actiondata = result;
	    console.log("***************************************");

	    console.log(actiondata);
	    var up = 0;
	    var down = 0;
	    var fav = 0;
	    var share = 0;
	    var read = 0;

	    var aup = 0;
	    var adown = 0;
	    var afav = 0;
	    var ashare = 0;

	    var bup = 0;
	    var bdown = 0;
	    var bfav = 0;
	    var bshare = 0;

	    var cup = 0;
	    var cdown = 0;
	    var cfav = 0;
	    var cshare = 0;
	    

	    for(var x in actiondata){
			var each = actiondata[x];

			if(each.username=='aaa' && each.action == 'upvoted') aup=aup+1;
			if(each.username=='aaa' && each.action == 'downvoted') adown=adown+1;
			if(each.username=='aaa' && each.action == 'favourite') afav=afav+1;
			if(each.username=='aaa' && each.action == 'clickshare') ashare=ashare+1;
			
			if(each.username=='bbb' && each.action == 'upvoted') bup=bup+1;
			if(each.username=='bbb' && each.action == 'downvoted') bdown=bdown+1;
			if(each.username=='bbb' && each.action == 'favourite') bfav=bfav+1;
			if(each.username=='bbb' && each.action == 'clickshare') bshare=bshare+1;

			if(each.username=='ccc' && each.action == 'upvoted') cup=cup+1;
			if(each.username=='ccc' && each.action == 'downvoted') cdown=cdown+1;
			if(each.username=='ccc' && each.action == 'favourite') cfav=cfav+1;
			if(each.username=='ccc' && each.action == 'clickshare') cshare=cshare+1;


			if(each.action == 'upvoted') up = up + 1;	
			if(each.action == 'downvoted') down = down + 1;
			if(each.action == 'favourite') fav = fav + 1;	
			if(each.action == 'clickshare') share = share + 1;
			if(each.action == 'reading_answer') read = read + 1;
		}

		actiondata = [{"name":"upvote","data":up},{"name":"downvote","data":down},
		{"name":"favourite","data":fav},{"name":"share","data":share}, {"name":"reading_answer","data":read}];

		userdate = [{
		        name: 'aaa',
		        data: [aup, adown, afav,ashare]

		    }, {
		        name: 'bbb',
		        data: [bup, bdown, bfav,bshare]

		    }, {
		        name: 'ccc',
		        data: [cup, cdown, cfav,cshare]

		    }]

	    callback(result);
	    db.close();
	  });
	});
}

module.exports = router;