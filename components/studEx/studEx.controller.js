'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('studExCtrl', studExCtrlFunc);

	studExCtrlFunc.$inject = ['$scope', '$http'];
	
	function studExCtrlFunc($scope, $http) {
		$scope.form = 'choice';
		$scope.user = {};

		$scope.register = function () {
			$http.post(config.backend_url + '/user', $scope.user).then(success, error);

			function success (response) {
				console.log(response);
			};

			function error (response) {
				console.log(response);
			}
		};
	
		$scope.login = function () {

		};

	};

})();
