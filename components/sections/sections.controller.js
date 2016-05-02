'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('sectionsCtrl', sectionsCtrlFunc);

	sectionsCtrlFunc.$inject = ['$scope', '$http', '$location'];
	
	function sectionsCtrlFunc($scope, $http, $location) {
		$scope.isHidden = true;
		$scope.csvHide = true;
		
		$scope.uploadSection = function () {
			$scope.isHidden = !$scope.isHidden;
		}

		$scope.uploadCSV = function () {
			$scope.csvHide = false;
		}

		$scope.hide = function () {
			$scope.csvHide = true;
		}

		$scope.addClass = function () {
				$location.path('/account');
		}


		$http({
			method: 'GET',
			url: 'http://' + config.backend_url + '/classes',
			withCredentials:true
		}).then(success, error);

		function success (response) {
			console.log(response);
			$scope.classes = response.data.data.items;
		};

		function error (response) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(response.status)
					.hideDelay(1000)
							);
		}
	};

})();
