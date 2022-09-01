angular.module('NutriPath').controller('DailyCtrl', function($scope, $http, mvIdentity, mvFoods, mvUser, mvDaily, $q, $location) {
 
  var vm = this;

  vm.items = mvIdentity.currentUser.foods;
  vm.meals = mvIdentity.currentUser.meals;

  vm.dvCalories = 2000;
  vm.dvFat = 65;
  vm.dvCarbs = 300;
  vm.dvProtein = 50;
  vm.dvSodium = 2400;
  vm.dvFiber = 25;

  if(mvDaily.editing){
    vm.editing = true;
    vm.selectedItems = mvDaily.day.items;
    vm.theDate = new Date(mvDaily.day.date);
    vm.calories = mvDaily.day.calories;
    vm.fat = mvDaily.day.fat;
    vm.carbs = mvDaily.day.carbs;
    vm.protein = mvDaily.day.protein;
    vm.sodium = mvDaily.day.sodium;
    vm.fiber = mvDaily.day.fiber;
  }
  else{
    vm.editing = false;
    vm.selectedItems = [];
    vm.theDate = new Date();
    vm.calories = 0;
    vm.fat = 0;
    vm.carbs = 0;
    vm.protein = 0;
    vm.sodium = 0;
    vm.fiber = 0;
  }

  vm.cancelEditedDay = function(){
    mvDaily.day = {};
    mvDaily.editing = false;
    $location.path('/calendar');
  }
  vm.clearDay = function(){
    vm.selectedItems = [];
  }

  vm.deleteItem = function(index){
    vm.selectedItems.splice(index, 1);
    vm.getNutritionTotals();
  };
  vm.getNutritionTotals = function(){
    vm.calories = 0; 
    vm.fat = 0; 
    vm.carbs = 0;
    vm.protein = 0;
    vm.sodium = 0; 
    vm.fiber = 0;

    for(var i = 0; i < vm.selectedItems.length; i++){
      var item = vm.selectedItems[i];
      vm.calories += (item.calories);
      vm.fat += (item.fat);
      vm.carbs += (item.carbs);
      vm.protein += (item.protein);
      vm.sodium += (item.sodium);
      vm.fiber += (item.fiber);
    }
  };
  vm.packageDay = function(){
    var day = {};
    day.date = vm.theDate;
    day.items = vm.selectedItems;
    day.calories = vm.calories;
    day.fat = vm.fat;
    day.carbs = vm.carbs;
    day.protein = vm.protein;
    day.sodium = vm.sodium;
    day.fiber = vm.fiber;
    return day;
  }
  vm.saveDay = function(){
    var day = vm.packageDay();
    mvDaily.createDay(day).then(function(){
      vm.selectedItems = [];
      $location.path('/calendar');
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.saveEditedDay = function(){
    var day = vm.packageDay();
    day._id = mvDaily.day._id;
    mvDaily.editDay(day).then(function(){
      mvDaily.day = {};
      mvDaily.editing = false;
      $location.path('/calendar');
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.selectItem = function(item){
    vm.selectedItems.push(item);
    vm.getNutritionTotals();
  };


});


