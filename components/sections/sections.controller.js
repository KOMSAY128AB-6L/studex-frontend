'use strict';

(function () {
	var app = angular.module('studEx');
	app.controller('sectionsCtrl', sectionsCtrlFunc);

	sectionsCtrlFunc.$inject = ['$scope', '$http'];
	
	function sectionsCtrlFunc($scope, $http) {
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
	};

})();
