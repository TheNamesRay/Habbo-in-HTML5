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
app.service("userHandler", ["$rootScope", "$socket", function(f, g) {
	return {
		calculateTile: function(a) {
			a = document.elementFromPoint(a.pageX, a.pageY);
			return !$(a).hasClass("inner") || $(a).parent().hasClass("empty") || $(a).parent().hasClass("wall-left") || $(a).parent().hasClass("wall-right") ? null : a;
		},
		move: function(a) {
			for (var d in a.steps) {
				(function(b) {
					window.setTimeout(function() {
						var c = $("[data-x=" + a.steps[b][0] + "][data-y=" + a.steps[b][1] + "]"),
							d = parseInt($(c).css("top")) - 80,
							c = $(c).css("left");
						$("[id=user" + a.id + "]").css({
							top: d + "px",
							left: c
						});
					}, 100 * b);
				})(d);
			}
		},
		inject: function(a) {
			var d = $('<div class="avatar"></div>'),
				b = a.currentPosition.split(":"),
				c = $("[data-x=" + b[0] + "][data-y=" + b[1] + "]"),
				b = parseInt($(c).css("top")) - 80,
				c = $(c).css("left");
			$(d).attr("id", "user" + a.id);
			$(d).css({
				top: b + "px",
				left: c,
				"background-image": "url(https://www.habbo.com.tr/habbo-imaging/avatarimage?figure=" + a.figure + "&size=n&direction=2&head_direction=2&crr=3&gesture=sml&size=n&direction=2&head_direction=2&crr=3&gesture=sml)"
			});
			$("#map #map-users").append(d);
		},
		remove: function(a) {
			$("#user" + a).remove();
		},
		chatBubble: function(a, d, b) {
			var c = $('<div class="chat-bubble"></div>');
			b = b.split(":");
			var e = $("[data-x=" + b[0] + "][data-y=" + b[1] + "]");
			b = parseInt($(e).css("top")) - 100;
			e = $(e).css("left");
			$(c).css({
				top: b + "px",
				left: e
			});
			$(c).html(d + " said: " + a);
			$("#map #map-chat-bubbles").append(c);
			setInterval(function() {
				$(c).css({
					top: parseInt($(c).css("top")) - 30 + "px"
				});
			}, 2E3);
		}
	};
}]);