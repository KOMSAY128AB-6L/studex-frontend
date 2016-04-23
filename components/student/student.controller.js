'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('studentCtrl', studentCtrlFunc);

	studentCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast'];
	
	function studentCtrlFunc($scope, $http, $location, $mdToast) {

		$scope.add = function () {
			$http({
				method: 'POST',
				url: 'http://' + config.backend_url + '/student',
				data: $scope.user,
				withCredentials:true
			}).then(success, error);

			console.log($scope.user);

			function success (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully added!')
						.hideDelay(1000)
                );
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.status)
						.hideDelay(1000)
                );
			}
		};


	};

})();
