'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('sectionCtrl', sectionCtrlFunc);
	
	sectionCtrlFunc.$inject = ['$scope', '$http', '$mdToast', '$filter', 'navbarService', 'authService'];
	
  function sectionCtrlFunc($scope, $http, $mdToast, $filter, navbarService, authService) {
		$scope.title = 'CMSC 128 AB-6L';
		$scope.check = false;
		
		$http({
		  	method: 'GET',
		  	url: 'http://' + config.backend_url + '/class/' + '6',
		  	withCredentials: true
		  }).then(success, error);
		  
		  function success(response){
		  	$scope.class = response.data.data.items;
		  	$scope.flag = [];
		  }
		  
		  function error(response){
		  	$mdToast.show(
		  		$mdToast.simple()
		  			.textContent(response.data.errors[0].message)
		  			.hideDelay(3000)
		  	);
		  };
		  
		  $scope.editSection = function(){
		  	$scope.title = 'EDIT SECTION';
		  	$scope.check = true;
		  }
		  
		  $scope.editStudent = function(index) {
		  	$scope.flag[index] = true;
			$scope.title = 'EDIT STUDENT';
		};
		
		$scope.saveStudent = function(index) {
			console.log($scope.class[index]);
			
			let data = $scope.class[index];
			let temp_id = $scope.class[index].student_id;
			console.log(temp_id);
			
			$http({
				method: 'PUT',
				url: config.protocol + config.backend_url + '/student/' + temp_id,
				data: data,
				withCredentials:true
			}).then(success, error);
			
			function success (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Successfully updated student!')
						.hideDelay(1000)
                );
			};
			
			function error (response) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.errors[0].message)
						.hideDelay(3000)
                );
			}
		}
	};
  
  
})();
