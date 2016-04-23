'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('addclassCtrl', addclassCtrlFunc);

	app.config(customTheme);

  function addclassCtrlFunc($scope, $http) {
  		$scope.title = 'ADD CLASS';
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
					.textContent(response.data.errors[0].message)
					.hideDelay(1000)
			);
		}

  };

})();
