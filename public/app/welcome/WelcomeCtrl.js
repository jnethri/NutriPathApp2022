angular.module('NutriPath').controller('WelcomeCtrl', function($scope, $http, mvIdentity, mvAuth, $location, mvNotifier) {
 
 	var vm = this;

 	vm.identity = mvIdentity;

 	vm.onSubmit = addUser;
  vm.newUser = {};
  vm.newUserFields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'E-Mail Address',
        placeholder: '',
        required: true
      }
    },
     {
      key: 'username',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Username',
        placeholder: '',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: '',
        required: true
      }
    },
    {
      key: 'confirm-password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm Password',
        placeholder: '',
        required: true
      }
    }
  ];

	vm.showModal = "hidden";

	function addUser(){
    mvAuth.createUser(vm.newUser).then(function(){
      $location.path('/my-foods');
      vm.closeSignupModal();
    }, function(reason){
      mvNotifier.error(reason);
    })
  };
  vm.closeSignupModal = function(){
  	vm.showModal = "hidden";
  };
	vm.loginUser = function(username, password){
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				console.log("LOGGED IN");
				$location.path('/calendar');
			}
			else{
				mvNotifier.error("Login info incorrect");
			}
		});
  };
  vm.logoutUser = function(){
  	mvAuth.logoutUser().then(function(){
  		$scope.username = "";
  		$scope.password = "";
  		$location.path('/');
  	})
  };
  vm.openSignupModal = function(){
  	vm.showModal = "show";
  };

});