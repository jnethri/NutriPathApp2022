var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption.js');

var mealSchema = mongoose.Schema({
	name: {type: String, required: "{PATH} is required"},
	items: {type: Array},
	calories: {type: Number},
	fat: {type: Number},
	carbs: {type: Number},
	protein: {type: Number},
	sodium: {type: Number},
	fiber: {type: Number},
});
var daySchema = mongoose.Schema({
	date: {type: Date},
	items: {type: Array},
	calories: {type: Number},
	fat: {type: Number},
	carbs: {type: Number},
	protein: {type: Number},
	sodium: {type: Number},
	fiber: {type: Number},
});

var userSchema = mongoose.Schema({
	email: {type: String, required: "{PATH} is required", index:{unique: true, dropDups: true}},
	username: {type: String, required: "{PATH} is required", index:{unique: true, dropDups: true}},
	password: {type: String, required: "{PATH} is required"},
	salt: {type: String, required: "{PATH} is required"},
	hashed: {type: String, required: "{PATH} is required"},
	foods: {type: Array},
	meals: [mealSchema],
	days: [daySchema],
	goals: {
    calories: { type: Number, default: 2000},
    fat: { type: Number, default: 65},
    carbs: { type: Number, default: 300},
    protein: { type: Number, default: 50},
    sodium: { type: Number, default: 2400},
    fiber: { type: Number, default: 25},
  }
});

userSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed;
	}
};

var User = mongoose.model('User', userSchema);