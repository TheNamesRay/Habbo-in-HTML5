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
module.exports = function(a, b) {
	if (b.currentUser) {
		b.emit("change loading state", {
			response: 50
		});
		for (var c in a.users) {
			if (a.users[c].ip == b.handshake.address || c == b.currentUser.id) {
				a.console.writeLine.warning("(" + a.users[c].ip + ') User "' + a.users[c].username + '" tried to login again.'), a.io.sockets.connected[a.users[c].socketId] && a.io.sockets.connected[a.users[c].socketId].disconnect(), delete a.users[c];
			}
		}
		a.event.emit("user login", b);
	} else {
		b.emit("client error", {
			response: "no_user_identified"
		}), b.disconnect();
	}
};