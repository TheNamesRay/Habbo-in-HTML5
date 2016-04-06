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
var pf = require("pathfinding");
module.exports = function(b, c, d) {
	c.on("user chat", function(a) {
		if (a != null) {
			var isCommand = false;
			var ha = a.match("\:ha (.*)");
			if (ha) {
				b.io.sockets.emit('dialog', {
					title: 'Message by Habbo Staff',
					body: ha[1]
				});
				isCommand = true;
			};
			var about = a.match("\:about");
			if (about) {
				c.emit('dialog', {
					title: 'About H5 Habbo Server',
					body: 'Created by Kedi Agbogre'
				});
				isCommand = true;
			};
			!isCommand && (a = b.sanitize(a), b.io.sockets["in"](d.roomId).emit("user chat bubble", a, c.currentUser.username, b.rooms[d.roomId].users[c.currentUser.id].currentPosition));
		}
	});
	c.on("user typing", function() {
		b.io.sockets["in"](d.roomId).emit('user typing bubble', c.currentUser.id);
	});
	c.on("user stopped typing", function() {
		b.io.sockets["in"](d.roomId).emit('user stopped typing', c.currentUser.id);
	});
};