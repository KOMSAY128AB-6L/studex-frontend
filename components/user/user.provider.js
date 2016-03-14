/*'use strict';

(function(){
	var app = angular.module('studEx');
	app.provider('userProvider', userProviderFunc);

	userProviderFunc.$inject = ['$http'];
		
	function userProviderFunc($http) {
		var url = config.backend_url;

		function createUser(data) {
			$http.post(url + "/register", data)
				.then(
					function success(response) {
						provider.createUser.status = response.status;
						provider.createUser.data = response.data;
					},
					function failure(response) {
						provider.createUser.status = response.status;
						provider.createUser.data = 'Request failed';
					}
				);
		}
	}
})();*/
