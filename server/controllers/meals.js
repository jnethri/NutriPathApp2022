var Meal = require('mongoose').model('Meal');
var Food = require('mongoose').model('Food');
var User = require('mongoose').model('User');

exports.addMeal = function(req, res, next){
	var newMeal = req.body.meal;
	var userId = req.body._id;
	Meal.create(newMeal, function(err, meal){
		if(err){
			res.status(400);
			return res.send({reason: err.toString()});
		}
		User.findOne({_id: userId}).exec(function(err, user){
			user.meals.push(meal);
			user.save(function(err){
				if(err) {res.status(400); return res.send({reason:err.toString()});}
				res.send(user);
			});
		})
	})
};

exports.deleteMeal = function(req, res, next){
	var mealId = req.body.mealId;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.meals.length; i++){
			if(user.meals[i]._id == mealId){
				user.meals.splice(i,1);
				break;
			}
		}
		user.save(function(err){
			if(err) {res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};

exports.editMeal = function(req, res){
	var oldMeal = req.body.meal;
	var mealId = oldMeal._id;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.meals.length; i++){
			if(user.meals[i]._id == mealId){
				user.meals[i].items = [];
				for(j=0; j<oldMeal.items.length; j++){
					user.meals[i].items.push(oldMeal.items[j]);
				}
				user.meals[i].calories = oldMeal.calories;
				user.meals[i].fat = oldMeal.fat;
				user.meals[i].carbs = oldMeal.carbs;
				user.meals[i].protein = oldMeal.protein;
				user.meals[i].sodium = oldMeal.sodium;
				user.meals[i].fiber = oldMeal.fiber;
				break;
			}
		}
		user.save(function(err, user){
			if(err) { res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};

