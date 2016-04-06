/**
 * Habbo API
 *
 * Based upon original code by:
 *
 * Copyright (c) 2014 Kedi Agbogre (me@kediagbogre.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
app.controller('MainController', ['$scope', '$rootScope', '$socket', '$location', function($scope, $rootScope, $socket, $location) {
	$rootScope.dialog = {
		enabled: false,
		title: '',
		body: ''
	};
	$rootScope.hcWindow = {
		enabled: false
	};
	$rootScope.superfluousBarItems = true;
	$rootScope.superfluousFriendBarItems = true;
	$socket.on('more credits', function() {
		var audio = new Audio('assets/sounds/cashRegister.mp3');
		audio.play();
	});
	$scope.toggleSuperfluousBarItems = function() {
		$rootScope.superfluousBarItems = $rootScope.superfluousBarItems ? false : true;
	};
	$scope.toggleSuperfluousFriendBarItems = function() {
		$rootScope.superfluousFriendBarItems = $rootScope.superfluousFriendBarItems ? false : true;
	};
	$scope.logout = function() {
		close();
	};
	$scope.enterRoom = function() {
		if(!$rootScope.isInRoom) {
			$location.path('/room');
		};
	};
	$scope.leaveRoom = function() {
		if($rootScope.isInRoom) {
			$socket.emit('user leave');
			$socket.off('load all users');
			$socket.off('user join');
			$socket.off('render room');
			$socket.off('remove user');
			$socket.off('user chat bubble');
			$socket.off('user typing bubble');
			$socket.off('user stopped typing');
			$socket.off('user move');
			$rootScope.isInRoom = false;
			$location.path('/view');
		};
	};
	$socket.on('dialog', function(data) {
		$rootScope.dialog.enabled = true;
		$rootScope.dialog.title = data.title;
		$rootScope.dialog.body = data.body;
	});
	$scope.buyHabboClub = function() {
		$rootScope.dialog.enabled = true;
		$rootScope.dialog.title = 'Feature not implemented yet';
		$rootScope.dialog.body = 'This feature is still not here!';
	};
	$scope.featureNotImplemented = function() {
		$rootScope.dialog.enabled = true;
		$rootScope.dialog.title = 'Feature not implemented yet';
		$rootScope.dialog.body = 'This feature is still not here!';
	};
	$socket.on('client error', function(data) {
		alert(data.response);
	});
	$socket.on('disconnect', function() {
		$location.path('/');
		console.log('User disconnected.');
	});
	$rootScope.clientCount = 0;
	$socket.on('client count update', function(data) {
		$rootScope.clientCount = data.response;
	});
}]);