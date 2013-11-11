'use strict';

angular.module('emulvcApp')
	.controller('LoginCtrl', function($scope, $http, ConfigProviderService, Iohandlerservice) {
		$scope.username = '';
		console.log(ConfigProviderService)
		$scope.passcode = '';
		$scope.loginError = '';

		$scope.tryLogin = function() {
			if ($scope.passcode === ConfigProviderService.vals.userManagment.passcode) {
				$scope.loginError = 'CORRECT PASSCODE!... getting users utterance list...';
				var filePath = 'testdata/' + $scope.username + '.json';
				// $http.get just used as a test if file exists 
				$http.get(filePath).success(function(data) {
					$scope.loginError = 'Loading data...';
					Iohandlerservice.httpGetUttJson(filePath);
					$scope.cancel();

				}).error(function() {
					$scope.loginError = 'WRONG USERNAME!!!';
				});
			} else {
				$scope.loginError = 'WRONG PASSCODE!';
			}
		}
	});