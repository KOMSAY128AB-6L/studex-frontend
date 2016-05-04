'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('homeCtrl', homeCtrlFunc);
	

	homeCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService', 'authService'];

	function homeCtrlFunc($scope, $http, $location, $mdToast, navbarService, authService) {
		authService.auth();

		$scope.title = 'RANDOMIZE';
		$scope.navigation = navbarService.navigation();

		$scope.data = {
			student_list: [],
			settings: {
				numberOfVolunteers: 0
			}
		};

		$http({
				method: 'GET',
				url: config.protocol + config.backend_url + '/classes',
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
		};

		$scope.selectClass = function () {
  			$scope.data.student_list = [];

  			angular.forEach($scope.classes, function (value, key) {

  				if (!!value.selected) {
  					if (!!$scope.data.no_called) {
  						$http({
	  						method: 'GET',
	  						url: config.protocol + config.backend_url + '/repetition/' + value.class_id,
	  						withCredentials: true
	  					}).then(
	  					(response) => {
	  						response.data.data.items.forEach((student) => {
	  							var stud_obj = {student_id: student.student_id};
	  							$scope.data.student_list.push(stud_obj);
	  						});
	  					}, 
	  					(response) => {
	  						$mdToast.show(
								$mdToast.simple()
									.textContent(response.data.errors[0].message)
									.hideDelay(1000)
	          				);
	  					});
  					}
  					else {
  						$http({
	  						method: 'GET',
	  						url: config.protocol + config.backend_url + '/student/' + value.class_id,
	  						withCredentials: true
	  					}).then(
	  					(response) => {
	  						response.data.data.items.forEach((student) => {
	  							var stud_obj = {student_id: student.student_id};
	  							$scope.data.student_list.push(stud_obj);
	  						});
	  					}, 
	  					(response) => {
	  						$mdToast.show(
								$mdToast.simple()
									.textContent(response.data.errors[0].message)
									.hideDelay(1000)
	          				);
	  					});
  					}
  				}
  			});
		
		};

		$scope.getVolunteers = function () {
			$scope.data.settings.byChance = false;
			$scope.data.settings.byCount = false;

			if ($scope.data.group1 === 'chance') {
				$scope.data.settings.byChance = true;
			}
			else if ($scope.data.group1 === 'count') {
				$scope.data.settings.byCount = true;
			}

			$http({
				method: 'POST',
				url: config.protocol + config.backend_url + '/randomize/students',
				data: $scope.data,
				withCredentials: true
			}).then(
			(response) => {
				$scope.students = response.data.data.items;
			}, 
			(response) => {
				$mdToast.show(
				$mdToast.simple()
					.textContent(response.data.errors[0].message)
					.hideDelay(1000)
				);
			});
		}

	};

})();
