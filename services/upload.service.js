'use strict';

(function () {
	var app = angular.module('studEx');
	app.directive('fileModel', fileModelFunc);

	fileModelFunc.$inject = ['$parse'];

	function fileModelFunc ($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function(){
					scope.$apply(function(){
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}

	app.service('uploadService', uploadServiceFunc);

	uploadServiceFunc.$inject = ['$http', '$location', '$mdToast'];
	function uploadServiceFunc ($http, $location, $mdToast) {

		this.uploadFileToUrl = function(file, uploadUrl){
			var fd = new FormData();
			fd.append('csv', file);

			$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined},
				withCredentials: true
			})

			.success(function(){
				$mdToast.show(
					$mdToast.simple()
						.textContent("Successfully uploaded")
						.hideDelay(3000)
				);
			})

			.error(function(){
				$mdToast.show(
					$mdToast.simple()
						.textContent("Error in uploading file")
						.hideDelay(3000)
				);
			});
		}

		this.uploadPicToUrl = function(file, uploadUrl, callback){
			var fd = new FormData();
			fd.append('pic', file);

			$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined},
				withCredentials: true
			})

			.success(function(){
				$mdToast.show(
					$mdToast.simple()
						.textContent("Successfully uploaded")
						.hideDelay(3000)
				);
				callback();
			})

			.error(function(){
				$mdToast.show(
					$mdToast.simple()
						.textContent("Error in uploading file")
						.hideDelay(3000)
				);
			});
		}

	}

})();
