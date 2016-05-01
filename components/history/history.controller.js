'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('historyCtrl', historyCtrlFunc);


	historyCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService', 'authService'];
	
	function historyCtrlFunc($scope, $http, $location, $mdToast, navbarService, authService) {
		$scope.title = 'HISTORY';

		$scope.navigation = navbarService.navigation();

		$scope.volunteer_log = function () {
			$scope.title = 'VOLUNTEERED STUDENTS';

			$http({
				method: 'GET',
				url: 'http://' + config.backend_url + '/student_logs',
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$scope.volunteers = response.data.data.items;
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.status)
						.hideDelay(1000)
                );
			};
		};


		$scope.transaction_log = function () {
			$scope.title = 'TRANSACTIONS';

			$http({
				method: 'GET',
				url: 'http://' + config.backend_url + '/history',
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$scope.transactions = response.data.data.items;
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.status)
						.hideDelay(1000)
                );
			};
		};


	};

})();
