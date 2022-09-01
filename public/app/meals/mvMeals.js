angular.module('NutriPath').factory('mvMeals', function($http, mvIdentity, mvUser, $q){
	return{

		createMeal: function(meal){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/meals/post/:' + userId, {_id: userId, meal:meal}).then(function(response){
	      if(response.status == 200){
	      	mvIdentity.currentUser = response.data;
	      	dfd.resolve(true);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise
		},
		deleteItem: function(mealId){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/meals/delete/:' + mealId, {userId: userId, mealId: mealId}).then(function(response){
	      if(response.status == 200){
	      	mvIdentity.currentUser = response.data;
	      	dfd.resolve(true);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise
		},
		editMeal: function(meal){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/meals/put/:' + meal._id, {userId: userId, meal: meal}).then(function(response){
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