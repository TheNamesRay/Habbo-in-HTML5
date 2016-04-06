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
var http = require("http"),
	socketIo = require("socket.io"),
	pool = require("./database/pool"),
	events = require("events"),
	sanitizer = require("sanitizer"),
	rl = require("readline").createInterface(process.stdin, process.stdout);
module.exports = function(b, d) {
	var a = this;
	a.users = {};
	a.rooms = {};
	a.loops = [];
	a.configuration = b;
	a.fuserights = d;
	this.scope = function() {
		return a;
	};
	this.buildHttp = function() {
		a.server = http.createServer();
	};
	this.buildEventHandler = function() {
		a.event = new events.EventEmitter;
	};
	this.buildIo = function() {
		a.io = socketIo(a.server);
	};
	this.buildPool = function() {
		a.pool = pool(b);
	};
	this.listen = function() {
		a.server.listen(b.server.ports.game, function(e) {
			a.console.updateTitle();
			setInterval(function() {
				a.console.updateTitle();
			}, 100);
			a.console.writeLine.bass("H5 Habbo Server - Created by Kedi Agbogre");
			e ? 
				a.console.writeLine.error("Unable to listen on port " + b.server.ports.game) :
					 (a.console.writeLine.warning("Server now listening on port " + b.server.ports.game), a.acceptCommands());
		});
	};
	this.acceptCommands = function() {
		rl.on("line", function(e) {
			switch (e) {
				case "shutdown":
					a.console.shutdown();
					break;
				case "online count":
					a.console.onlineCount();
					break;
				default:
					a.console.writeLine.error("Command not recognized");
			}
		});
	};
	this.filter = function(a, b) {
		for (var c in b) {
			a = a.replace("%" + c + "%", b[c]);
		}
		return a;
	};
	this.sanitize = function(a) {
		return sanitizer.escape(a);
	};
	this.securify = function(a) {
		var b = ["password"];
		if (a.id) {
			for (var c in a) {
				-1 < b.indexOf(c) && delete a[c];
			}
		} else {
			for (var d in a) {
				for (c in a[d]) {
					-1 < b.indexOf(c) && delete a[c];
				}
			}
		}
		return a;
	};
	this.game = {
		user: {
			update: require("./game/user/update"),
			greet: require("./game/user/greet"),
			enter: require("./game/user/enter"),
			loops: {
				creditsAndDuckets: require("./game/user/loops").creditsAndDuckets
			}
		},
		rooms: {
			load: require("./game/rooms/load"),
			move: require("./game/rooms/move"),
			chat: require("./game/rooms/chat"),
			leave: require("./game/rooms/leave")
		}
	};
	this.networking = {
		socketConnection: require("./networking/connection").socketConnection,
		gameConnection: require("./networking/connection").gameConnection,
		singleSignOn: require("./networking/sso"),
		redundancyCheck: require("./networking/redundancy"),
		login: require("./networking/login")
	};
	this.console = require("./utils/console")(a);
};