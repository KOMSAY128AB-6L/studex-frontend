'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('sectionsCtrl', sectionsCtrlFunc);

	sectionsCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast', 'navbarService', 'authService', 'uploadService'];

	function sectionsCtrlFunc($scope, $http, $location, $mdToast, navbarService, authService, uploadService) {
		authService.auth();

		$scope.config = config;
		$scope.check = false;
		$scope.isHidden = true;
		$scope.studentHide = true;
		$scope.csvHide = true;
		$scope.navigation = navbarService.navigation();
		$scope.class = {};
		$scope.section = {};
		$scope.student = {
			picture: 'default'
		};
		$scope.title = 'SECTIONS';

		$scope.addStudent = function () {
			$http({
				method: 'POST',
				url: config.protocol + config.backend_url + '/student/' + $scope.student.class_id,
				data: $scope.student,
				withCredentials:true
			}).then(
			function (response) {
				$scope.form = 'viewSection';
				$scope.viewSection($scope.section);
				$mdToast.show(
 				$mdToast.simple()
						.textContent('Student successfully added!')
						.hideDelay(3000)
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

		$scope.viewAddStudent = function () {
			$scope.title = 'ADD STUDENT';
			$scope.form = 'addStudent';
		}

		$scope.viewSection = function (section) {
			$scope.title = section.class_name + section.section;
			$scope.form = 'viewSection';

			$scope.section.class_name = section.class_name;
			$scope.section.className  = section.class_name;
			$scope.section.section    = section.section;
			$scope.section.class_id   = section.class_id;
			$scope.section.id         = section.class_id.toString();

			$scope.student.class_id  = section.class_id;

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
				$scope.class = {};
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
						.hideDelay(3000)
                );
			},
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});
		};

		$scope.deleteSection = function () {
			$http({
				method: 'DELETE',
				url: config.protocol + config.backend_url + '/class/' + $scope.section.id,
				withCredentials: true
			}).then(
			function (response) {
				$scope.title = 'SECTIONS';
				getClasses(function () {
					$scope.form = 'default';
				});
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully deleted class!')
						.hideDelay(3000)
                );
			},
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});
		};

		$scope.editStudent = function(index) {
		  	$scope.flag[index] = true;
		};

		$scope.saveStudent = function(index) {
			var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			
			if (!email.test($scope.class[index].email)) {
				return $mdToast.show(
					$mdToast.simple()
						.textContent('Email invalid!')
						.hideDelay(3000)
                );
			}

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
						.hideDelay(3000)
                );
			},
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});

		};

		$scope.deleteStudent = function (index) {
			var id = $scope.class[index].student_id;

			$http({
				method: 'DELETE',
				url: config.protocol + config.backend_url + '/student/' + id,
				withCredentials: true
			}).then(
			function (response) {
				$scope.viewSection($scope.section);
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully deleted student!')
						.hideDelay(3000)
                );
			},
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});
		};

		$scope.uploadSection = function () {
			$scope.isHidden = !$scope.isHidden;
		}

		$scope.handleCSV = function() {
			$scope.title = 'UPLOAD CSV';
			$scope.form = 'upload';
		};

		$scope.uploadFiles = function(file, errFiles) {
			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				var formData = new FormData();
				formData.append("csv", file);
				file.upload = uploadService.uploadFileToUrl(file, config.protocol + config.backend_url + '/class/csv');

				$scope.form = 'home';
				$scope.title = 'MY ACCOUNT';
				$scope.csv = "";
			}
		};

		$scope.printCSV = function() {
			$http({
				method: 'GET',
				url: config.protocol + config.backend_url + '/class/csv',
				headers: {'Content-Type': undefined},
				withCredentials:true
			}).then(success, error);

			function success (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully printed csv file!')
						.hideDelay(3000)
        );
				$scope.form = 'home';
				$scope.title = 'MY ACCOUNT';
				$scope.csv = "";
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
        );
			};
		}

		$scope.hideCSV = function () {
			$scope.csvHide = true;
		}

		$scope.addClass = function () {
			$scope.title = "ADD CLASS";
		}

		function getClasses (callback) {
			$http({
				method: 'GET',
				url: config.protocol + config.backend_url + '/classes',
				withCredentials:true
			}).then(success, error);

			function success (response) {
				$scope.classes = response.data.data.items;
				callback();
			};

			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
				);
				if (response.status === 403) {
					authService.destroy();
					$location.path('/');
				} else {
					$scope.classes = {};
					callback();
				}
			}
		};

		getClasses(function () {});

		$scope.add_class = function () {
			$http({
				method: 'POST',
				url: config.protocol + config.backend_url + '/class',
				data: $scope.class,
				withCredentials: true
			}).then(
			function (response) {
				$scope.title = 'SECTIONS';
				getClasses(function () {
					$scope.form = 'default';
				});
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully added class!')
						.hideDelay(3000)
                );
			},
			function (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			});
		};


	};

})();
