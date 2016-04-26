'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('homeCtrl', homeCtrlFunc);
	

	homeCtrlFunc.$inject = ['$scope', '$http', '$location', '$mdToast'];

	function homeCtrlFunc($scope, $http, $location, $mdToast) {
		$scope.title = 'RANDOMIZE';
	};

})();