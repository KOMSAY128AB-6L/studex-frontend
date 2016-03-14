'use strict';

(function () {
	var app = angular.module('studEx', ['ngRoute']);
	app.config(configFunc);

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
