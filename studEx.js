'use strict';

(function () {
	var app = angular.module('studEx', ['ngRoute', 'ngMaterial', 'ngAnimate']);
	app.config(configFunc);

	configFunc.$inject=['$routeProvider'];
	
	

	function configFunc($routeProvider) {
		$routeProvider
			.when('/', {
				'templateUrl': './components/studEx/studEx.view.html',
				'controller' : 'studExCtrl'
			})
			.when('/', {
				'templateUrl': './components/account/account.view.html',
				'controller' : 'accountCtrl'
			})
			.otherwise({'redirectTo': '/'})
	}



})();
