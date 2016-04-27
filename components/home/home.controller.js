'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('homeCtrl', homeCtrlFunc);
	

	homeCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService'];

	function homeCtrlFunc($scope, $http, $location, $mdToast, navbarService) {
		$scope.title = 'RANDOMIZE';

		$scope.navigation = navbarService.navigation();

		$http({
				method: 'GET',
				url: 'http://' + config.backend_url + '/classes',
				data: $scope.user,
				withCredentials:true
			}).then(success, error);

		function success (response) {
			$scope.classes = response.data.data.items;
		};

		function error (response) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(response.data.errors[0].message)
					.hideDelay(1000)
            );
		}
	};

})();
