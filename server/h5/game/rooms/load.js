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
module.exports = function(c, a, b) {
  c.users[a.currentUser.id].currentRoom = b.roomId;
  c.console.writeLine.info("(" + a.currentUser.ip + ') User "' + a.currentUser.username + '" joined ' + b.roomId);
  a.emit("render room", {heightmap:b.matrix});
  a.join(b.roomId);
  c.rooms[b.roomId] || (c.rooms[b.roomId] = {}, c.rooms[b.roomId].users = {});
  c.rooms[b.roomId].users[a.currentUser.id] = a.currentUser;
  c.rooms[b.roomId].users[a.currentUser.id].currentPosition = "0:5";
  c.io.sockets["in"](b.roomId).emit("dialog", {title:a.currentUser.username + " has joined the room", body:"Everybody give him/her a welcoming hug!"});
  a.emit("load all users", c.securify(c.rooms[b.roomId].users));
  a.broadcast.to(b.roomId).emit("user join", a.currentUser);
};