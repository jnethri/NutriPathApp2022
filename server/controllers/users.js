var User = require('mongoose').model('User');
var Food = require('mongoose').model('Food');
var encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createUser = function(req, res, next){
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed = encrypt.hashPassword(userData.salt, userData.password);

	var dupEmail = false;
	var dupUsername = false;

	User.find({email: userData.email}).exec(function(err, collection){
		if(collection.length > 0){
			dupEmail = true;
		}
	});
	User.find({username: userData.username}).exec(function(err, collection){
		if(collection.length > 0){
			dupUsername = true;
		}
	});

	User.create(userData, function(err, user){
		if(err){
			var errMsg = "";
			if(dupEmail){
				errMsg += "An account with this email address already exists.\n"
			}
			if(dupUsername){
				errMsg += "Sorry, this username is already taken."
			}
			err = new Error(errMsg);
			res.status(400);
			return res.send({reason: err.toString()});
		}
		req.logIn(user, function(err){
			if(err){return next(err);}
			res.send(user);
		})
	})
};

exports.editGoals = function(req, res, next){
	var newGoals = req.body.goals;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.foods.length; i++){
			user.goals = newGoals;
		}
		user.save(function(err, user){
			if(err) {res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};
