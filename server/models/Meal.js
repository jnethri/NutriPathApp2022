var mongoose = require('mongoose');

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

var Meal = mongoose.model('Meal', mealSchema);