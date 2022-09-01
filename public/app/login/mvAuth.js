angular.module('NutriPath').factory('mvAuth', function($http, mvIdentity, mvUser, $q){
	return{
		authenticateUser: function(username, password){
			var dfd = $q.defer();

			$http.post('/login', {username: username, password: password}).then(function(response){
	      if(response.data.success){
	      	var user = new mvUser();
	      	angular.extend(user, response.data.user);
	      	mvIdentity.currentUser = user;
	      	dfd.resolve(true);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

	    return dfd.promise;
		},

		createUser: function(userData){
			var newUser = new mvUser(userData);
			var dfd = $q.defer();

			newUser.$save().then(function(){
				mvIdentity.currentUser = newUser;
				dfd.resolve();
			}, function(response){
				dfd.reject(response.data.reason);
			});

			return dfd.promise
		},

		logoutUser: function(){
			var dfd = $q.defer();
			
			$http.post('/logout', {logout: true}).then(function(response){
	      mvIdentity.currentUser = undefined;
	      dfd.resolve();
	    });

	    return dfd.promise;
		}
	}
});