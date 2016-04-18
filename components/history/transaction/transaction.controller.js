'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('transactionCtrl', transactionCtrlFunc);

	transactionCtrlFunc.$inject = ['$scope', '$http'];
	
	function transactionCtrlFunc($scope, $http) {
				
		/*
		$http({
			method: 'GET',
			url: 'http://' + config.backend_url + '/',
			withCredentials: true
		}).then(success, error)

		function success (response) {
			$scope.transactions = response.data;
		};

		function error (response) {
			console.log(response);
		};
		*/

		//for testing purposes
		$scope.transactions = [
			{
				transaction : 'Transaction',
				transaction_date : '07/30/1997'
			},
			{
				transaction : 'Transaction',
				transaction_date : '07/30/1997'
			},



		];
	};

})();
