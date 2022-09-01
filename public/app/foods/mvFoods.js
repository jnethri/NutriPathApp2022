angular.module('NutriPath').factory('mvFoods', function($http, mvIdentity, mvUser, $q){
	return{

		createItem: function(item){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/foods/post/:' + userId, {_id: userId, item:item}).then(function(response){
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
		deleteItem: function(itemId){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/foods/delete/:' + itemId, {userId: userId, itemId: itemId}).then(function(response){
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
		editItem: function(item){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/foods/put/:' + item._id, {userId: userId, item: item}).then(function(response){
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
		usdaSearch: function(term){
			var dfd = $q.defer();

			$http.get('https://api.nutritionix.com/v1_1/search/' + term + '?fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_sodium%2Cnf_dietary_fiber&appId=5d11d7cb&appKey=1045827ad8f2f2a19d402024fd9319c6').then(function(response){
	      if(response.status == 200){
	      	var usdaSearchResult = response.data.hits;
	      	dfd.resolve(usdaSearchResult);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise;
		},
		usdaPackageItem: function(item){
			console.log(item);
    	var newItem = {};
    	if(item.fields.brand_name != "USDA") newItem.name = item.fields.brand_name + " " + item.fields.item_name;
    		else newItem.name = item.fields.item_name;
    	newItem.portion = item.fields.nf_serving_size_qty + " " + item.fields.nf_serving_size_unit;
    	newItem.calories = item.fields.nf_calories;
    	newItem.protein = item.fields.nf_protein;
    	newItem.fat = item.fields.nf_total_fat;
    	newItem.carbs = item.fields.nf_total_carbohydrate;
    	newItem.fiber = item.fields.nf_dietary_fiber;
    	newItem.sodium = item.fields.nf_sodium;

			return newItem;
		}

	}
});