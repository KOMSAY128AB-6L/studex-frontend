'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('accountCtrl', accountCtrlFunc);

	app.config(customTheme);

	accountCtrlFunc.$inject = ['$scope', '$http', '$mdToast', '$filter', 'navbarService', 'authService'];
	customTheme.$inject = ['$mdThemingProvider'];

	function customTheme($mdThemingProvider) {
    $mdThemingProvider.definePalette('customPrimary', {
			'50': '#737373',
			'100': '#666666',
			'200': '#595959',
			'300': '#4d4d4d',
			'400': '#404040',
			'500': '#333',
			'600': '#262626',
			'700': '#1a1a1a',
			'800': '#0d0d0d',
			'900': '#000000',
			'A100': '#808080',
			'A200': '#8c8c8c',
			'A400': '#999999',
			'A700': '#000000',
			'contrastDefaultColor': 'light',
		});
		$mdThemingProvider.theme('default')
			.primaryPalette('customPrimary')
	};

  function accountCtrlFunc($scope, $http, $mdToast, $filter, navbarService, authService) {
		authService.auth();

		$scope.title = 'MY ACCOUNT';
		$scope.null_picture = false;

		$scope.navigation = navbarService.navigation();

		$http({
			method: 'GET',
			url: 'https://' + config.backend_url + '/teacher',
			withCredentials:true
		}).then(success, error);

		function success (response) {
			$scope.user = response.data;
			$scope.null_picture = ($scope.user.picture == null);
		};

		function error (response) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(response.data.errors[0].message)
					.hideDelay(1000)
			);
		};

		$scope.changePass = function () {
			$scope.form = 'password';
			$scope.title = 'CHANGE PASSWORD';
		};

		$scope.savePass = function() {
			$scope.title = 'MY ACCOUNT';
			$scope.form = 'home';
			$scope.old_password = "";
			$scope.new_password = "";
			$scope.confirm_password = "";
		};

		$scope.editProfile = function() {
			$scope.form = 'edit';
			$scope.title = 'EDIT PROFILE';
			$scope.fab = {'mode': 'ng-fling'};
			$scope.temp = $scope.user;
			$scope.temp.last_name = $filter('uppercase')($scope.temp.last_name);
			$scope.temp.first_name = $filter('uppercase')($scope.temp.first_name);
			$scope.temp.middle_initial = $filter('uppercase')($scope.temp.middle_initial);
			console.log($scope.fab);
		};

		$scope.editPic = function() {
			console.log("Implement edit pic");
		};

		$scope.saveProfile = function() {
			$http({
				method: 'PUT',
				url: 'https://' + config.backend_url + '/teacher',
				data: $scope.temp,
				withCredentials:true
			}).then(success, error);

			function success (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully updated profile!')
						.hideDelay(1000)
                );
				$scope.user = $scope.temp;
				$scope.form = 'home';
				$scope.title = 'MY ACCOUNT';
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1000)
                );
			}
		}
  };
})();
