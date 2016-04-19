'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('historyCtrl', historyCtrlFunc);


	historyCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast'];
	
	function historyCtrlFunc($scope, $http, $location, $mdToast) {

		$scope.logout = function () {
			$http({
				method: 'POST',
				url: 'http://' + config.backend_url + '/logout',
				withCredentials:true
			}).then(success, error);

			function success (response) {
				$location.path('/');
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.status)
						.hideDelay(1000)
                );
			}
		};

		$scope.volunteer_log = function () {
			$http({
				method: 'GET',
				url: 'http://' + config.backend_url + '/student_logs',
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$scope.volunteers = response.data.data.items;
			};

			function error (response) {

			}
		};


		$scope.transaction_log = function () {
			$scope.transactions= [
				{
					transaction : 'Transaction',
					transaction_date : '07/30/1997'
				},
				{
					transaction : 'Transaction',
					transaction_date : '07/30/1997'
				},

			];
		};


	};

})();
