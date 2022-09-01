angular.module('NutriPath').factory('mvDaily', function($http, mvIdentity, mvUser, $q){
	return{

		createDay: function(day){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/days/post/:' + userId, {_id: userId, day: day}).then(function(response){
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
		day: {},
		deleteDay: function(dayId){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/days/delete/:' + dayId, {userId: userId, dayId: dayId}).then(function(response){
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
		editing: false,
		editDay: function(day){
			console.log(day);
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/days/put/:' + day._id, {userId: userId, day: day}).then(function(response){
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