'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('accountCtrl', accountCtrlFunc);

	app.config(customTheme);

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

  function accountCtrlFunc($scope, $http) {
		$scope.null_picture = false;

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
					.textContent(response.status)
					.hideDelay(1000)
							);
		}

  };

})();
