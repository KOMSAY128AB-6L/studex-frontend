'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('volunteerCtrl', volunteerCtrlFunc);

	volunteerCtrlFunc.$inject = ['$scope', '$http'];
	
	function volunteerCtrlFunc($scope, $http) {
		/*
		$http({
			method: 'GET',
			url: 'http://' + config.backend_url + '/student_logs',
			withCredentials: true
		}).then(success, error)

		function success (response) {
			$scope.volunteers = response.data;
		};

		function error (response) {
			console.log(response);
		};
		*/

		//for testing purposes
		$scope.volunteers = [
			{
				first_name : 'Joseph',
				middle_initial: 'D.',
				last_name: 'Tyler',
				volunteer_date : '07/30/1997'
			},
			{
				first_name : 'Joseph',
				middle_initial: 'D.',
				last_name: 'Tyler',
				volunteer_date : '07/30/1997'
			},


		];
	};

})();
