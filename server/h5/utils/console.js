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
var colors = require("colors/safe");
module.exports = function(d) {
	var b = this;
	this.shutdown = function() {
		process.exit();
	};
	this.onlineCount = function() {
		b.log("There are currently " + colors.cyan(Object.keys(d.users).length) + " people online");
	};
	this.updateTitle = function() {
		var a = new Date(null);
		a.setSeconds(process.uptime());
		a = a.toISOString().substr(11, 8);
		process.title = "H5 Habbo Server - " + Object.keys(d.users).length + " online - " + a + " uptime";
	};
	this.writeLine = {
		error: function(a) {
			b.log(colors.red(a));
		},
		success: function(a) {
			b.log(colors.green(a));
		},
		warning: function(a) {
			b.log(colors.yellow(a));
		},
		bold: function(a) {
			b.log(colors.bgMagenta(a));
		},
		info: function(a) {
			b.log(colors.cyan(a));
		},
		bass: function(a) {
			b.log(colors.trap(a));
		}
	};
	this.log = function(a) {
		function b(a) {
			10 > a && (a = "0" + a);
			return a;
		}
		var c = new Date,
			d = b(c.getHours()),
			e = b(c.getMinutes()),
			c = b(c.getSeconds());
		console.log("[" + d + ":" + e + ":" + c + "] " + a);
	};
	return b;
};