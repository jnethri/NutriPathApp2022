angular.module('NutriPath').controller('MealsCtrl', function($scope, $http, $filter, mvIdentity, mvNotifier, mvMeals, $q, $anchorScroll, $location) {

  var vm = this;

  vm.items = mvIdentity.currentUser.foods;
  vm.meals = mvIdentity.currentUser.meals;

  vm.newMeal = {};
  vm.newMeal.items = [];
  vm.newMeal.name = "";
  vm.newMeal.calories = 0;
  vm.newMeal.fat = 0;
  vm.newMeal.carbs = 0;
  vm.newMeal.protein = 0;
  vm.newMeal.sodium = 0;
  vm.newMeal.fiber = 0;

  vm.editIndex = -1;
  vm.addState = false;
  vm.mealsCopy = [];

  vm.getNutritionTotals = function(){
    vm.newMeal.calories = 0; 
    vm.newMeal.fat = 0; 
    vm.newMeal.carbs = 0;
    vm.newMeal.protein = 0;
    vm.newMeal.sodium = 0; 
    vm.newMeal.fiber = 0;

    for(var i = 0; i < vm.newMeal.items.length; i++){
      var item = vm.newMeal.items[i];
      vm.newMeal.calories += (item.calories);
      vm.newMeal.fat += (item.fat);
      vm.newMeal.carbs += (item.carbs);
      vm.newMeal.protein += (item.protein);
      vm.newMeal.sodium += (item.sodium);
      vm.newMeal.fiber += (item.fiber);
    }
  };

  

  vm.addItemToMeal = function(item){
    vm.newMeal.items.push(item);
    vm.getNutritionTotals();
  };
  vm.addItemsToEdit = function(item, meal){
    var mealId = vm.meals.indexOf(meal);
    vm.addNutritionTotals(mealId, item);
    vm.meals[mealId].items.push(item);
    vm.addState = false;
  }
  vm.addMeal = function(){
    mvMeals.createMeal(vm.newMeal).then(function(){
      mvNotifier.notify(vm.newMeal.name + ' has been added to your database.');
      vm.meals = mvIdentity.currentUser.meals;
      vm.newMeal = {};
      vm.newMeal.items = [];
      vm.newMeal.name = ""; 
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.addNutritionTotals = function(mealId, item){
    vm.meals[mealId].calories += item.calories; 
    vm.meals[mealId].fat += item.fat; 
    vm.meals[mealId].carbs += item.carbs; 
    vm.meals[mealId].protein += item.protein; 
    vm.meals[mealId].sodium += item.sodium; 
    vm.meals[mealId].fiber += item.fiber; 
  };
  vm.cancelMealEdit = function(){
    vm.meals = vm.mealsCopy;
    vm.editIndex = -1;
  };
  vm.deleteItemFromMeal = function(meal, itemId){
    var mealId = vm.meals.indexOf(meal);
    vm.subtractNutritionTotals(mealId, itemId);
    vm.meals[mealId].items.splice(itemId, 1);
  };
  vm.deleteMeal = function(mealId){
    vm.editIndex = -1;
    mvMeals.deleteItem(mealId).then(function(){
      vm.meals = mvIdentity.currentUser.meals;
      vm.mealsCopy = angular.copy(vm.meals);
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.editMealState = function(index){
    if(vm.editIndex != -1) vm.meals = vm.mealsCopy;
    vm.mealsCopy = angular.copy(vm.meals);
    vm.editIndex = index;
  }
  vm.saveEditedMeal = function(meal){
    mvMeals.editMeal(meal).then(function(){
      vm.meals = mvIdentity.currentUser.meals;
      vm.editIndex = -1;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };
  vm.showAddItemsToEdit = function(){
    vm.addState = true;
  }
  vm.subtractNutritionTotals = function(mealId, itemId){
    vm.meals[mealId].calories -= vm.meals[mealId].items[itemId].calories; 
    vm.meals[mealId].fat -= vm.meals[mealId].items[itemId].fat; 
    vm.meals[mealId].carbs -= vm.meals[mealId].items[itemId].carbs; 
    vm.meals[mealId].protein -= vm.meals[mealId].items[itemId].protein; 
    vm.meals[mealId].sodium -= vm.meals[mealId].items[itemId].sodium; 
    vm.meals[mealId].fiber -= vm.meals[mealId].items[itemId].fiber; 
  };

});


