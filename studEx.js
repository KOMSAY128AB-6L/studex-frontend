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
			.when('/account', {
				'templateUrl': './components/account/account.view.html',
				'controller' : 'accountCtrl'
			})
			.when('/account/password', {
				'templateUrl': './components/account/password/password.view.html',
				'controller' : 'changePassCtrl'
			})
			.when('/history', {
				'templateUrl': './components/history/history.view.html',
				'controller' : 'historyCtrl'
			})
			.otherwise({'redirectTo': '/'})
	}



})();
