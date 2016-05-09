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
			.when('/sections', {
				'templateUrl': './components/sections/sections.view.html',
				'controller' : 'sectionsCtrl'
			})
			.when('/home', {
				'templateUrl': './components/home/home.view.html',
				'controller' : 'homeCtrl'
			})
			.when('/sections/section', {
				'templateUrl': './components/sections/section/section.view.html',
				'controller' : 'sectionCtrl'
			})
			.otherwise({'redirectTo': '/'})

	}
})();
