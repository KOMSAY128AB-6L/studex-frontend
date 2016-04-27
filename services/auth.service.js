'use strict';

(function () {
	var app = angular.module('studEx');
	app.service('authService', authServiceFunc);

	authServiceFunc.$inject = ['$http', '$location', '$mdToast'];

	function authServiceFunc($http, $location, $mdToast) {

		(function auth() {
			$http({
				method: 'GET',
				url: 'http://' + config.backend_url + '/teacher',
				withCredentials:true
			}).then(success, error);

			function success (response) {

			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1000)
				);
				$location.path("/");
			}

		})();

	}

})();
