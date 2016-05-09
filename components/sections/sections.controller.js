'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('sectionsCtrl', sectionsCtrlFunc);

	sectionsCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService', 'authService'];
	
	function sectionsCtrlFunc($scope, $http, $location, $mdToast, navbarService, authService) {
		authService.auth();

		$scope.config = config;
		$scope.check = false;
		$scope.isHidden = true;
		$scope.csvHide = true;
		$scope.navigation = navbarService.navigation();
		$scope.class = {};
		$scope.section = {};
		$scope.title = "SECTIONS";
		
		$scope.viewSection = function (section) {
			$scope.title = section.class_name + section.section;
			$scope.form = 'viewSection';

			$scope.section.className = section.class_name;
			$scope.section.section   = section.section;
			$scope.section.id        = section.class_id.toString();

			$http({
				method: 'GET',
				url: config.protocol + config.backend_url + '/class/' + section.class_id,
			  	withCredentials: true
			}).then(
			function (response) {
				$scope.class = response.data.data.items;
		  		$scope.flag = [];
			},
			function (response) {
				$mdToast.show(
			  		$mdToast.simple()
			  			.textContent("No students")
			  			.hideDelay(3000)
			  	);
			});
			
			$scope.class_info = section;
		}

		$scope.editSection = function(){
			$scope.check = true;
		}

		$scope.saveSection = function(){
			$scope.check = false;

			var data = $scope.section;
			
			$http({
				method: 'PUT',
				url: config.protocol + config.backend_url + '/class',
				data: data,
				withCredentials:true
			}).then(
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully updated class!')
						.hideDelay(1000)
                );
			}, 
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});
		}

		$scope.editStudent = function(index) {
		  	$scope.flag[index] = true;
		};

		$scope.saveStudent = function(index) {
			$scope.flag[index] = false;
			
			var data = $scope.class[index];
			var temp_id = $scope.class[index].student_id;

			data.chance = parseFloat(data.chance);
			
			$http({
				method: 'PUT',
				url: config.protocol + config.backend_url + '/student/' + temp_id,
				data: data,
				withCredentials:true
			}).then(
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully updated student!')
						.hideDelay(1000)
                );
			}, 
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});
			
		}

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
		}

		$scope.add_class = function () {
			$http({
				method: 'POST',
				url: config.protocol + config.backend_url + '/class',
				data: $scope.class,
				withCredentials: true
			}).then(success, error);

			function success (response) {
				$location.path('/student');
			};

			function error (response) {
				$mdToast.show(
				$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(1000)
	          	);
			}
		};


	};

})();

