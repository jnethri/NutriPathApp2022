var Day = require('mongoose').model('Day');
var Meal = require('mongoose').model('Meal');
var Food = require('mongoose').model('Food');
var User = require('mongoose').model('User');

exports.addDay = function(req, res, next){
	var newDay = req.body.day;
	var userId = req.body._id;
	Day.create(newDay, function(err, day){
		if(err){
			res.status(400);
			return res.send({reason: err.toString()});
		}
		User.findOne({_id: userId}).exec(function(err, user){
			user.days.push(day);
			user.save(function(err){
				if(err) {res.status(400); return res.send({reason:err.toString()});}
				res.send(user);
			});
		})
	})
};

exports.deleteDay = function(req, res, next){
	var dayId = req.body.dayId;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.days.length; i++){
			if(user.days[i]._id == dayId){
				user.days.splice(i,1);
				break;
			}
		}
		user.save(function(err){
			if(err) {res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};

exports.editDay = function(req, res){
	var oldDay = req.body.day;
	var dayId = oldDay._id;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.days.length; i++){
			if(user.days[i]._id == dayId){
				user.days[i].items = [];
				for(j=0; j<oldDay.items.length; j++){
					user.days[i].items.push(oldDay.items[j]);
				}
				user.days[i].date = oldDay.date;
				user.days[i].calories = oldDay.calories;
				user.days[i].fat = oldDay.fat;
				user.days[i].carbs = oldDay.carbs;
				user.days[i].protein = oldDay.protein;
				user.days[i].sodium = oldDay.sodium;
				user.days[i].fiber = oldDay.fiber;
				break;
			}
		}
		user.save(function(err, user){
			if(err) { res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};

