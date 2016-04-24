'use strict';

(function () {
	var app = angular.module('studEx');
	app.service('navbarService', navbarServiceFunc);

	navbarServiceFunc.$inject = ['$http', '$location'];

	function navbarServiceFunc($http, $location) {

		this.navigation = function () {
			var navigation = {
				home : homeFunc,
				account : accountFunc,
				sections : sectionsFunc,
				history : historyFunc,
				logout : logoutFunc
			};
		
			function homeFunc () {
				$location.path('/home');
			};

			function accountFunc () {
				$location.path('/account');
			};

			function sectionsFunc () {
				$location.path('/sections');
			};

			function historyFunc () {
				$location.path('/history');
			};

			function logoutFunc () {
				$http({
					method: 'GET',
					url: 'http://' + config.backend_url + '/logout',
					withCredentials:true
				}).then(success, error);

				function success (response) {
					$location.path('/');
				};

				function error (response) {
					console.log(response);
					$mdToast.show(
						$mdToast.simple()
							.textContent(response.data.errors[0].message)
							.hideDelay(1000)
	                );
				}
			};

			return navigation;
		};

		
	}

})();
