angular.module('NutriPath').controller('CalendarCtrl', function($scope, $http, mvIdentity, mvDaily, mvUser, mvCalendar, $q, $location) {
 
  var vm = this;

  vm.days = mvIdentity.currentUser.days;
  vm.days = mvCalendar.calculateHex(vm.days);
  vm.goals = mvIdentity.currentUser.goals;
  vm.totals = mvCalendar.calculateTotals();

  vm.editingGoals = false;

  vm.deleteDay = function(dayId){
    mvDaily.deleteDay(dayId).then(function(){
      vm.days = mvCalendar.calculateHex(mvIdentity.currentUser.days);
      vm.totals = mvCalendar.calculateTotals();
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.editDay = function(day){
    mvDaily.day = day;
    mvDaily.editing = true;
    $location.path('/daily');
  };
  vm.editGoals = function(){
    vm.editingGoals = true;
  }
  vm.goToDaily = function(){
    mvDaily.day = {};
    mvDaily.editing = false;
    $location.path('/daily');
  };
  vm.saveGoals = function(goals){
    mvCalendar.editGoals(goals).then(function(){
      vm.editingGoals = false;
      vm.days = mvCalendar.calculateHex(mvIdentity.currentUser.days);
      vm.totals = mvCalendar.calculateTotals();
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  }

});


