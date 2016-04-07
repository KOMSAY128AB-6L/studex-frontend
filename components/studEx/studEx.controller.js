'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('studExCtrl', studExCtrlFunc);

	studExCtrlFunc.$inject = ['$scope', '$http'];
	
	function studExCtrlFunc($scope, $http) {
		$scope.form = 'choice';
		$scope.user = {};

		$scope.register = function () {
			$http({
				method: 'POST',
				url: config.backend_url + '/user',
				data: $scope.user,
				withCredentials:true
			}).then(success, error);

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
