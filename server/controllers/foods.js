var Food = require('mongoose').model('Food');
var User = require('mongoose').model('User');

exports.addFoodItem = function(req, res, next){
	var foodItemData = req.body.item;
	var userId = req.body._id;
	Food.create(foodItemData, function(err, food){
		if(err){
			res.status(400);
			return res.send({reason: err.toString()});
		}
		User.findOne({_id: userId}).exec(function(err, user){
			user.foods.push(food);
			user.save(function(err){
				if(err) {res.status(400); return res.send({reason:err.toString()});}
				res.send(user);
			});
		})
	})
};

exports.deleteFoodItem = function(req, res, next){
	var itemId = req.body.itemId;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.foods.length; i++){
			if(user.foods[i]._id == itemId){
				user.foods.splice(i,1);
				break;
			}
		}
		user.save(function(err){
			if(err) {res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};

exports.editFoodItem = function(req, res, next){
	var item = req.body.item;
	var itemId = req.body.item._id;
	var userId = req.body.userId;
	User.findOne({_id: userId}).exec(function(err, user){
		for(i=0; i<user.foods.length; i++){
			if(user.foods[i]._id == itemId){
				user.foods.splice(i,1);
				user.foods.push(item);
				break;
			}
		}
		user.save(function(err, user){
			if(err) {res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
};