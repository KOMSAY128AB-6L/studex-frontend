'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('studExCtrl', studExCtrlFunc);

	studExCtrlFunc.$inject = ['$scope'];
	
	

	function studExCtrlFunc($scope) {
		$scope.form = 'choice';
		$scope.user = {};
	};



})();
