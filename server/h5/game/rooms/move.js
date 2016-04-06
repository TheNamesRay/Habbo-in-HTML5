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
module.exports = function(d, e, a) {
	e.on("verify movement", function(b) {
		var c = d.rooms[a.roomId].users[e.currentUser.id].currentPosition.split(":"),
			f = c[0],
			g = c[1],
			c = b.finalCoordinates.x;
		b = b.finalCoordinates.y;
		if (f + ":" + g != c + ":" + b) {
			var h = new pf.Grid(a.matrix),
				m = new pf.AStarFinder({
					allowDiagonal: !0
				}),
				k;
			for (k in d.rooms[a.roomId].users) {
				var l = d.rooms[a.roomId].users[k].currentPosition.split(":");
				h.setWalkableAt(l[0], l[1], !1);
			}
			f = m.findPath(f, g, c, b, h.clone());
			d.rooms[a.roomId].users[e.currentUser.id].currentPosition = c + ":" + b;
			d.io.sockets["in"](a.roomId).emit("user move", {
				steps: f,
				id: e.currentUser.id
			});
		}
	});
};