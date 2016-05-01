'use strict';

(function () {
	var app = angular.module('studEx');
	app.service('authService', authServiceFunc);

	authServiceFunc.$inject = ['$http', '$location', '$mdToast'];

	function authServiceFunc($http, $location, $mdToast) {

		this.auth = function() {
			$http({
				method: 'GET',
				url: 'https://' + config.backend_url + '/teacher',
				withCredentials:true
			}).then(success, error);

			function success (response) {
				if ($location.path() === '/') {
					$location.path('/home');
				}
			};

			function error (response) {
				if ($location.path() !== '/' && response.status === 403) {
					$location.path('/');
				}
			}

		};

	}

})();
