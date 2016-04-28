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
		$scope.title = 'MY ACCOUNT';
		$scope.null_picture = false;

		$scope.pwForm = {};

		$scope.navigation = navbarService.navigation();

		$http({
			method: 'GET',
			url: 'http://' + config.backend_url + '/teacher',
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
			$scope.accountView = 'password';
			$scope.title = 'CHANGE PASSWORD';
		};

		$scope.savePass = function() {
			if($scope.pwForm.new_password != $scope.pwForm.confirm_password) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('New password does not match!')
						.hideDelay(3000)
                );
			} else {
				$http({
					method: 'POST',
					url: 'http://' + config.backend_url + '/change_password',
					data: $scope.pwForm,
					withCredentials:true
				}).then(success, error);

				function success (response) {
					$mdToast.show(
						$mdToast.simple()
							.textContent('Successfully updated password!')
							.hideDelay(3000)
	                );
						$scope.title = 'MY ACCOUNT';
						$scope.accountView = 'home';
				};

				function error (response) {
					$mdToast.show(
						$mdToast.simple()
							.textContent(response.data.errors[0].message)
							.hideDelay(3000)
	                );
				}
			}
		};

		$scope.editProfile = function() {
			$scope.accountView = 'edit';
			$scope.title = 'EDIT PROFILE';
			$scope.fab = {'mode': 'ng-fling'};
			$scope.temp = $scope.user;
			$scope.temp.last_name = $filter('uppercase')($scope.temp.last_name);
			$scope.temp.first_name = $filter('uppercase')($scope.temp.first_name);
			$scope.temp.middle_initial = $filter('uppercase')($scope.temp.middle_initial);
		};

		$scope.editPic = function() {
			console.log("Implement edit pic");
		};

		$scope.saveProfile = function() {
			$http({
				method: 'PUT',
				url: 'http://' + config.backend_url + '/teacher',
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
				$scope.accountView = 'home';
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
