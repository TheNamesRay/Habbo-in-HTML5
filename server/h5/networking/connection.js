/**
 * Habbo HTML5
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
module.exports = {
	socketConnection: function(a) {
		a.io.on("connection", function(c) {
			a.event.emit("begin client connection", c);
			c.on("disconnect", function() {
				for (var b in a.users) {
					if (a.users[b].socketId === c.id) {
						null != a.users[b].currentRoom && (a.console.writeLine.info("(" + a.users[b].ip + ') User "' + a.users[b].username + '" left ' + a.users[b].currentRoom), delete a.rooms[a.users[b].currentRoom].users[b], c.removeAllListeners("verify movement"), c.removeAllListeners("user leave"), a.io.sockets["in"](a.users[b].currentRoom).emit("remove user", b));
						a.console.writeLine.info("(" + a.users[b].ip + ') User "' + a.users[b].username + '" disconnected');
						delete a.users[b];
						for (var d in a.loops[b]) {
							clearInterval(a.loops[b][d]);
						}
						delete a.loops[b];
					}
				}
				a.io.sockets.emit("client count update", {
					response: Object.keys(a.users).length
				});
			});
		});
	},
	gameConnection: function(a, c) {
		c.on("client connection", function(b) {
			c.clientVars = b;
			c.emit("change loading state", {
				response: 25
			});
			a.event.emit("begin sso check", c);
		});
	}
};