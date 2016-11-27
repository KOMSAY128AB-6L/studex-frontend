'use strict';

(function () {
	var app = angular.module('studEx', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngFileUpload']);
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
			.when('/contactus', {
				'templateUrl': './components/contact_us/contact_us.view.html',
				'controller' : 'contactusCtrl'
			})
			.otherwise({'redirectTo': '/'})

	}
})();
