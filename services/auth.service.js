'use strict';

(function () {
	var app = angular.module('studEx');
	app.service('authService', authServiceFunc);

	authServiceFunc.$inject = ['$http', '$location', '$mdToast'];

	function authServiceFunc($http, $location, $mdToast) {

		this.getSession = function () {
			var user = {};

			user.teacher_id = localStorage.getItem('teacher_id');
			user.first_name = localStorage.getItem('first_name');
			user.middle_initial = localStorage.getItem('middle_initial');
			user.last_name = localStorage.getItem('last_name');
			user.email = localStorage.getItem('email');
			user.picture = localStorage.getItem('picture');

			return user;
		}

		this.setSession = function (data, callback) {
			localStorage.setItem('teacher_id', data.teacher_id);
			localStorage.setItem('first_name', data.first_name);
			localStorage.setItem('middle_initial', data.middle_initial);
			localStorage.setItem('last_name', data.last_name);
			localStorage.setItem('email', data.email);
			localStorage.setItem('picture', data.picture);

			callback();
		}

		this.destroy = function () {
			localStorage.clear();
		}

		this.auth = function() {
			if (!!localStorage.getItem('email')) {
				if ($location.path() === '/') {
					$location.path('/home');
				}
			}
			else {
				if ($location.path() !== '/') {
					$location.path('/');
				}
			}

		};

	}

})();
