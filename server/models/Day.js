var mongoose = require('mongoose');

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

var Day = mongoose.model('Day', daySchema);