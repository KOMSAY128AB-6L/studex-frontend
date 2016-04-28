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
			.when('/history/volunteer', {
				'templateUrl': './components/volunteer/volunteer.view.html',
				'controller' : 'volunteerCtrl'
			})
			.when('/history/transaction', {
				'templateUrl': './components/transaction/transaction.view.html',
				'controller' : 'transactionCtrl'
			})
			.when('/addclass', {
				'templateUrl': './components/addclass/addclass.view.html',
				'controller' : 'addclassCtrl'
			})
			.otherwise({'redirectTo': '/'})
	}



})();
