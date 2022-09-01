angular.module('NutriPath').value('mvToastr', toastr);

angular.module('NutriPath').factory('mvNotifier', function(mvToastr){
	return{
		notify: function(msg){
			mvToastr.success(msg);
		},
		error: function(msg){
			mvToastr.error(msg);
		}
	}
})