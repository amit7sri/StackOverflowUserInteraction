var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var LoginLog = require('../models/login');
var ActionLog = require('../models/action');

//Global
var currentUser = null;

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
			currentUser = username;
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
		var newLogin = new LoginLog({
			username: currentUser
		});
	
		LoginLog.createLogin(newLogin, function(err, userLogin){
			if(err) throw err;
			console.log(userLogin);
		});
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	console.log('authenticate   ' +req);
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

router.post('/action', function(req, res){
	var userAction = req.body.useraction;
	console.log("User Action:", userAction);
	res.send(userAction);

	if (userAction != "undefined") {
		if(currentUser != null) {
			var newAction = new ActionLog({
				username: currentUser,
				action: userAction
			});

			ActionLog.createAction(newAction, function(err, userAction){
				if(err) throw err;
				console.log(userAction);
			});
		}
	}	
})

module.exports = router;