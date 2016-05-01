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
			.when('/history', {
				'templateUrl': './components/history/history.view.html',
				'controller' : 'historyCtrl'
			})
			.when('/student', {
				'templateUrl': './components/student/student.view.html',
				'controller' : 'studentCtrl'
			})
			.when('/home', {
				'templateUrl': './components/home/home.view.html',
				'controller' : 'homeCtrl'
			})
			.otherwise({'redirectTo': '/'})
	}



})();
