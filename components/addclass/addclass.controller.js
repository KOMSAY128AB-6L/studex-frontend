'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('addclassCtrl', addclassCtrlFunc);

	addclassCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService'];

	function addclassCtrlFunc($scope, $http, $location, $mdToast, navbarService) {	

  		$scope.title = 'ADD CLASS';
		$scope.navigation = navbarService.navigation();
		$scope.class = {};

		$scope.add_class = function () {
			$http({
				method: 'POST',
				url: 'http://' + config.backend_url + '/class',
				data: $scope.class,
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$location.path('/student');
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

		

  };

})();
