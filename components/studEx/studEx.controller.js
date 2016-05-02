'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('studExCtrl', studExCtrlFunc);
	app.config(configFunc);



	configFunc.$inject = ['$mdThemingProvider'];

	function configFunc($mdThemingProvider) {
		$mdThemingProvider.theme('default')
						.dark();
	};



	studExCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'authService'];

	function studExCtrlFunc($scope, $http, $location, $mdToast, authService) {
		authService.auth();

		$scope.form = 'choice';
		$scope.user = {};

		$scope.register = function () {
			if ($scope.user.password !== $scope.user.confirm) {
				$mdToast.show(
					$mdToast.simple()
						.textContent("Passwords do not match")
						.hideDelay(1000)
				);
				return;
			}

			$http({
				method: 'POST',
				url: 'http://' + config.backend_url + '/user',
				data: $scope.user,
				withCredentials:true
			}).then(success, error);

			function success (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully registered!')
						.hideDelay(1000)
                );
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1000)
                );
			}
		};

		$scope.login = function () {
			$http({
				method: 'POST',
				url: 'http://' + config.backend_url + '/login',
				data: $scope.user,
				withCredentials:true
			}).then(success, error);

			function success (response) {
				$location.path('/home');
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1000)
                );
			}
		};

	};

})();
