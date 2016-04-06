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
var env = require("./h5/environment"),
	conf = require("./h5/conf.json"),
	fuse = require("./h5/fuserights.json"),
	h5 = new env(conf, fuse);
h5.buildHttp();
h5.buildIo();
h5.buildPool();
h5.buildEventHandler();
h5.networking.socketConnection(h5.scope());
var callbacks = {
	clientConnection: function(a) {
		h5.networking.gameConnection(h5.scope(), a);
	},
	ssoCheck: function(a) {
		h5.networking.singleSignOn(h5.scope(), a);
	},
	establishConnection: function(a) {
		h5.networking.redundancyCheck(h5.scope(), a);
	},
	userLogin: function(a) {
		h5.networking.login(h5.scope(), a);
		h5.game.user.loops.creditsAndDuckets(h5.scope(), a);
	},
	clientViewRendered: function(a) {
		h5.game.user.greet(h5.scope(), a);
		h5.game.user.enter(h5.scope(), a);
	},
	loadRoom: function(a, b) {
		h5.game.rooms.load(h5.scope(), a, b);
		h5.game.rooms.chat(h5.scope(), a, b);
		h5.game.rooms.leave(h5.scope(), a, b);
		h5.game.rooms.move(h5.scope(), a, b);
	}
};
h5.scope().event.on("begin client connection", callbacks.clientConnection);
h5.scope().event.on("begin sso check", callbacks.ssoCheck);
h5.scope().event.on("establish connection", callbacks.establishConnection);
h5.scope().event.on("user login", callbacks.userLogin);
h5.scope().event.on("client view rendered", callbacks.clientViewRendered);
h5.scope().event.on("load room", callbacks.loadRoom);
h5.listen();