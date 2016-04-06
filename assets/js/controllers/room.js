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
app.controller('RoomController', ['$scope', '$socket', '$location', '$rootScope', 'userHandler', 'roomHandler',
	function($scope, $socket, $location, $rootScope, userHandler, roomHandler) {
		if (!$rootScope.isBootstrapped) {
			$location.path('/');
		} else {
			$rootScope.isInRoom = true;
			$socket.emit('load room', {
				roomId: 1
			});
			$scope.chatMessage = '';
			$socket.on('render room', function(data) {
				roomHandler.generateModel(data.heightmap);
				roomHandler.generateFurni([{
					name: 'hc_exe_sofa',
					tiles: ['13:5', '13:4', '13:3']
				}, {
					name: 'hc_tv',
					tiles: ['10:5', '10:4']
				}]);
			});
			$('#map').click(function(event) {
				var innerTile = userHandler.calculateTile(event);
				if (innerTile != null) {
					var coordinates = innerTile.innerHTML;
					var c = coordinates.split(':');
					$socket.emit('verify movement', {
						finalCoordinates: {
							x: parseInt(c[0]),
							y: parseInt(c[1])
						}
					});
				};
			});
			$('#chat-input').keyup(function(e) {
				!this.value ? $socket.emit('user stopped typing') : $socket.emit('user typing');
			});
			$scope.sendChatMessage = function() {
				$socket.emit('user chat', $scope.chatMessage);
				$scope.chatMessage = null;
			};
			$socket.on('user join', function(data) {
				$scope.injectUser(data);
			});
			$socket.on('user chat bubble', function(message, username, position) {
				userHandler.chatBubble(message, username, position);
			});
			$socket.on('remove user', function(userData) {
				userHandler.remove(userData)
			});
			$socket.on('load all users', function(allUsers) {
				for (var user in allUsers) {
					userHandler.inject(allUsers[user]);
				};
			});
			$socket.on('user typing bubble', function(userid) {
				$('#user' + userid).html('<img style="float:right" src="assets/images/hotelview/userIcons/typing.png">');
			});
			$socket.on('user stopped typing', function(userid) {
				$('#user' + userid).html('');
			});
			$socket.on('user move', function(data) {
				userHandler.move(data);
			});
		}
	}
]);