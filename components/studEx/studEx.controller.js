'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('studExCtrl', studExCtrlFunc);

	studExCtrlFunc.$inject = ['$scope'];
	
	

	function studExCtrlFunc($scope) {
		$scope.firstName = 'Gianni';
		$scope.lastName = 'Padernos';
		$scope.hello = function () {
			return 'Hello ' + $scope.firstName + ' ' + $scope.lastName;
		};
	};



})();
