'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('volunteerCtrl', volunteerCtrlFunc);

	volunteerCtrlFunc.$inject = ['$scope', '$http'];
	
	function volunteerCtrlFunc($scope, $http) {
		
		$http({
			method: 'GET',
			url: 'http://' + config.backend_url + '/student_logs',
			withCredentials: true
		}).then(success, error)

		function success (response) {
			$scope.volunteers = response.data.data.items;
		};

		function error (response) {
			console.log("error:"+response);
		};
		
	};

})();
