'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('sectionsCtrl', sectionsCtrlFunc);

	sectionsCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService'];
	
	function sectionsCtrlFunc($scope, $http, $location, $mdToast, navbarService) {
		$scope.isHidden = true;
		$scope.csvHide = true;
		$scope.navigation = navbarService.navigation();
		$scope.class = {};
		$scope.title = "SECTIONS";
		
		$scope.uploadSection = function () {
			$scope.isHidden = !$scope.isHidden;
		}

		$scope.uploadCSV = function () {
			$scope.csvHide = false;
		}

		$scope.hideCSV = function () {
			$scope.csvHide = true;
		}

		$scope.addClass = function () {
			$scope.title = "ADD CLASS";
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

