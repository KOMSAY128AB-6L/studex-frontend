'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('historyCtrl', historyCtrlFunc);


	historyCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService', 'authService'];
	
	function historyCtrlFunc($scope, $http, $location, $mdToast, navbarService, authService) {
		authService.auth();

		$scope.title = 'HISTORY';

		$scope.navigation = navbarService.navigation();

		$scope.volunteer_log = function () {
			$scope.title = 'VOLUNTEERED STUDENTS';

			$http({
				method: 'GET',
				url: config.protocol + config.backend_url + '/student_logs',
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$scope.volunteers = response.data.data.items;

				for(let i = 0;i<$scope.volunteers.length;i++){
					$scope.volunteers[i].volunteer_time = $scope.volunteers[i].volunteer_date.substring($scope.volunteers[i].volunteer_date.indexOf('T')+1,$scope.volunteers[i].volunteer_date.indexOf('.'));
					$scope.volunteers[i].volunteer_date = $scope.volunteers[i].volunteer_date.substring(0,$scope.volunteers[i].volunteer_date.indexOf('T'));
				}
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1750)
                );
			};
		};

		$scope.transaction_log = function () {
			$scope.title = 'TRANSACTIONS';

			$http({
				method: 'GET',
				url: config.protocol + config.backend_url + '/history',
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$scope.transactions = response.data.data.items;

				for(let i = 0;i<$scope.transactions.length;i++){
					$scope.transactions[i].log_date = $scope.transactions[i].log_time.substring(0,$scope.transactions[i].log_time.indexOf('T'));
					$scope.transactions[i].log_time = $scope.transactions[i].log_time.substring($scope.transactions[i].log_time.indexOf('T')+1,$scope.transactions[i].log_time.indexOf('.'));
				}
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1750)
                );
			};
		};


	};

})();
