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

var module = angular.module('socket.io', []);

module.provider('$socket', function $socketProvider() {
    
    var ioUrl = '';
    var ioConfig = {};
    
    function setOption(name, value, type) {
        if (typeof value != type) {
            throw new TypeError("'"+ name +"' must be of type '"+ type + "'");
        }     
        ioConfig[name] = value;
    }
        
    this.setResource = function setResource(value) {
        setOption('resource', value, 'string');
    };
    this.setConnectTimeout = function setConnectTimeout(value) {
        setOption('connect timeout', value, 'number');
    };
    this.setTryMultipleTransports = function setTryMultipleTransports(value) {
        setOption('try multiple transports', value, 'boolean');
    };
    this.setReconnect = function setReconnect(value) {
        setOption('reconnect', value, 'boolean');
    };
    this.setReconnectionDelay = function setReconnectionDelay(value) {
        setOption('reconnection delay', value, 'number');
    };
    this.setReconnectionLimit = function setReconnectionLimit(value) {
        setOption('reconnection limit', value, 'number');
    };
    this.setMaxReconnectionAttempts = function setMaxReconnectionAttempts(value) {
        setOption('max reconnection attempts', value, 'number');
    };
    this.setSyncDisconnectOnUnload = function setSyncDisconnectOnUnload(value) {
        setOption('sync disconnect on unload', value, 'boolean');
    };
    this.setAutoConnect = function setAutoConnect(value) {
        setOption('auto connect', value, 'boolean');
    };
    this.setFlashPolicyPort = function setFlashPolicyPort(value) {
        setOption('flash policy port', value, 'number')
    };
    this.setForceNewConnection = function setForceNewConnection(value) {
        setOption('forceNew', value, 'boolean');
    };
    this.setConnectionUrl = function setConnectionUrl(value){
        if ('string' !== typeof value) {
            throw new TypeError("setConnectionUrl error: value must be of type 'string'");
        }
        ioUrl = value;
    }
    
    this.$get = function $socketFactory($rootScope) {
        
        var socket = io(ioUrl, ioConfig);
                
        return {
            on : function on(event, callback){
                socket.on(event, function(){
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
                    var args = arguments;
                    // $apply faz com que a callback possa invocar variaveis
                    // em $scope que tenham sido declaradas pela
                    // directiva ng-model ou {{}}
                    $rootScope.$apply(function () {
                        // este callback.apply regista a função callback que
                        // poderá conter referencias à variavel socket
                        callback.apply(socket, args);
                    });
                });
            },
            off: function off(event, callback) {
                if (typeof callback == 'function') {
                    //neste caso o callback nao tem acesso a $scope nem à
                    //scope definida pela variavel socket
                    socket.removeListener(event, callback);
                } else {
                    socket.removeAllListeners(event);
                }
            },
            emit: function emit(event, data, callback) {
                if (typeof callback == 'function') {
                    socket.emit(event, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                }    
                else{
                    socket.emit(event, data);
                }
            }
        };
    };
});