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
			}).then(
			function (response) {
				$scope.classes = response.data.data.items;
			}, 
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1750)
            	);
			});

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
	  					function (response) {
	  						response.data.data.items.forEach((student) => {
	  							var stud_obj = {student_id: student.student_id};
	  							$scope.data.student_list.push(stud_obj);
	  						});
	  					}, 
	  					function (response) {
	  						$mdToast.show(
								$mdToast.simple()
									.textContent(response.data.errors[0].message)
									.hideDelay(1750)
	          				);
	  					});
  					}
  					else {
  						$http({
	  						method: 'GET',
	  						url: config.protocol + config.backend_url + '/student/' + value.class_id,
	  						withCredentials: true
	  					}).then(
	  					function (response) {
	  						response.data.data.items.forEach(function (student) {
	  							var stud_obj = {student_id: student.student_id};
	  							$scope.data.student_list.push(stud_obj);
	  						});
	  					}, 
	  					function (response) {
	  						$mdToast.show(
								$mdToast.simple()
									.textContent(response.data.errors[0].message)
									.hideDelay(1750)
	          				);
	  					});
  					}
  				}
  			});
		
		};

		$scope.inputTags = function () {
			if (!!$scope.data.tags_input) {
				$scope.data.tags = $scope.data.tags_input.split(/,\s*/);
			}
		}

		$scope.getVolunteers = function () {
			$scope.data.settings.byChance = false;
			$scope.data.settings.byCount = false;

			if ($scope.data.randomize === 'chance') {
				$scope.data.settings.byChance = true;
			}
			else if ($scope.data.randomize === 'count') {
				$scope.data.settings.byCount = true;
			}

			$http({
				method: 'POST',
				url: config.protocol + config.backend_url + '/randomize/students',
				data: $scope.data,
				withCredentials: true
			}).then(
			function (response) {
				$scope.students = response.data.data.items;
			}, 
			function (response) {
				$mdToast.show(
				$mdToast.simple()
					.textContent(response.data.errors[0].message)
					.hideDelay(1750)
				);
			});
		}

	};

})();
