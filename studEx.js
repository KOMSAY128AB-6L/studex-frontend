'use strict';

(function () {
	angular
		.module('studEx', ['ngRoute'])
		.config(configFunc);

	configFunc.$inject=['$routeProvider'];
	
	function configFunc($routeProvider) {
		$routeProvider
			.when('/', {
				'templateUrl': './components/studEx/studEx.view.html',
				'controller' : 'studExCtrl'
			})
			.otherwise({'redirectTo': '/'})
	}

})();
