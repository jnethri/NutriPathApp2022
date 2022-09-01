angular.module('NutriPath').factory('mvCalendar', function($http, mvIdentity, mvUser, $q){
	return{

		calculateHex: function(days){
			for(i=0; i<days.length; i++){
				var goals = mvIdentity.currentUser.goals;

		    var caloriesRatio = days[i].calories/goals.calories;
		    caloriesRatio = Math.max( Math.floor(caloriesRatio * 10) / 10 * 100).toFixed(0);
		    days[i].caloriesHex = "cr" + caloriesRatio.toString();

		    var fatRatio = days[i].fat/goals.fat;
		    fatRatio = Math.max( Math.floor(fatRatio * 10) / 10 * 100).toFixed(0);
		    days[i].fatHex = "cr" + fatRatio.toString();

		    var carbsRatio = days[i].carbs/goals.carbs;
		    carbsRatio = Math.max( Math.floor(carbsRatio * 10) / 10 * 100).toFixed(0);
		    days[i].carbsHex = "cr" + carbsRatio.toString();

		    var proteinRatio = days[i].protein/goals.protein;
		    proteinRatio = Math.max( Math.floor(proteinRatio * 10) / 10 * 100).toFixed(0);
		    days[i].proteinHex = "cr" + proteinRatio.toString();

		    var sodiumRatio = days[i].sodium/goals.sodium;
		    sodiumRatio = Math.max( Math.floor(sodiumRatio * 10) / 10 * 100).toFixed(0);
		    days[i].sodiumHex = "cr" + sodiumRatio.toString();

		    var fiberRatio = days[i].fiber/goals.fiber;
		    fiberRatio = Math.max( Math.floor(fiberRatio * 10) / 10 * 100).toFixed(0);
		    days[i].fiberHex = "cr" + fiberRatio.toString();
		  }

		  return days;
		},

		calculateTotals: function(){
			var days = mvIdentity.currentUser.days;
			var goals = mvIdentity.currentUser.goals;

			var totals = {};

			var totalCalories = 0;
		  var totalFat = 0;
		  var totalCarbs = 0;
		  var totalProtein = 0;
		  var totalSodium = 0;
		  var totalFiber = 0;

		  for(i=0; i<days.length; i++){
		    totalCalories+= days[i].calories;
		    totalFat+= days[i].fat;
		    totalCarbs+= days[i].carbs;
		    totalProtein+= days[i].protein;
		    totalSodium+= days[i].sodium;
		    totalFiber+= days[i].fiber;
		  }

		  totals.avgCalories = totalCalories/days.length
		  totals.avgFat = totalFat/days.length;
		  totals.avgCarbs = totalCarbs/days.length;
		  totals.avgProtein = totalProtein/days.length;
		  totals.avgSodium = totalSodium/days.length;
		  totals.avgFiber = totalFiber/days.length;

		  var caloriesRatio = totals.avgCalories/goals.calories;
		  caloriesRatio = Math.max( Math.floor(caloriesRatio * 10) / 10 * 100).toFixed(0);
		  totals.caloriesHex = "cr" + caloriesRatio.toString();

		  var fatRatio = totals.avgFat/goals.fat;
		  fatRatio = Math.max( Math.floor(fatRatio * 10) / 10 * 100).toFixed(0);
		  totals.fatHex = "cr" + fatRatio.toString();

		  var carbsRatio = totals.avgCarbs/goals.carbs;
		  carbsRatio = Math.max( Math.floor(carbsRatio * 10) / 10 * 100).toFixed(0);
		  totals.carbsHex = "cr" + carbsRatio.toString();

		  var proteinRatio = totals.avgProtein/goals.protein;
		  proteinRatio = Math.max( Math.floor(proteinRatio * 10) / 10 * 100).toFixed(0);
		  totals.proteinHex = "cr" + proteinRatio.toString();

		  var sodiumRatio = totals.avgSodium/goals.sodium;
		  sodiumRatio = Math.max( Math.floor(sodiumRatio * 10) / 10 * 100).toFixed(0);
		  totals.sodiumHex = "cr" + sodiumRatio.toString();

		  var fiberRatio = totals.avgFiber/goals.fiber;
		  fiberRatio = Math.max( Math.floor(fiberRatio * 10) / 10 * 100).toFixed(0);
		  totals.fiberHex = "cr" + fiberRatio.toString();

			return totals;
		},
		editGoals: function(goals){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/users/:' + userId, {userId: userId, goals:goals}).then(function(response){
	      if(response.status == 200){
	      	mvIdentity.currentUser = response.data;
	      	dfd.resolve(true);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise
		}

	}
});