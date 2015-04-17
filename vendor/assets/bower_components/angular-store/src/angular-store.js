angular.module('angular-store', [])
       .factory('Store', ['$window', '$document', function ($window, $document) {
        "use strict";

        var Store = {

            /**
             * BASE64 Keystring
             * @type {String}
             */
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            /**
             * Encode string
             * @param  {String} input
             * @return {String} BASE64 encoded string
             */
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Store._utf8_encode(input);

                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            /**
             * Decode string
             * @param  {String} input
             * @return {String} BASE64 decoded string
             */
            decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Store._utf8_decode(output);

                return output;

            },

            /**
             * UTF8 encode
             * @private
             * @param  {String} input
             * @return {String} UTF8 encoded string
             */
            _utf8_encode : function (input) {
                input = input.replace(/\r\n/g,"\n");
                var output = "";

                for (var n = 0; n < input.length; n++) {
                    var c = input.charCodeAt(n);

                    if (c < 128) {
                        output += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        output += String.fromCharCode((c >> 6) | 192);
                        output += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        output += String.fromCharCode((c >> 12) | 224);
                        output += String.fromCharCode(((c >> 6) & 63) | 128);
                        output += String.fromCharCode((c & 63) | 128);
                    }

                }

                return output;
            },

            /**
             * UTF8 decode
             * @private
             * @param  {String} input
             * @return {String} UTF8 decoded string
             */
            _utf8_decode : function (input) {
                var output = "";
                var i = 0;
                var c = 0, c1 = 0, c2 = 0;

                while ( i < input.length ) {
                    c = input.charCodeAt(i);

                    if (c < 128) {
                        output += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = input.charCodeAt(i+1);
                        output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = input.charCodeAt(i+1);
                        c3 = input.charCodeAt(i+2);
                        output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }

                return output;
            },

            /**
             * Set engine according to browser type
             * @param {String} engine
             * @return {void}
             */
            setEngine: function(engine) {
                if (engine) {
                    this.engine = engine;
                } else {
                    this.engine = 'Cookie';
                    if ('localStorage' in $window && $window.localStorage !== null) {
                        this.engine = 'LocalStorage';
                    } else {
                        try {
                            if ($document.getElementById('oPersistInput') && $document.getElementById('oPersistInput').addBehavior) {
                                this.engine = 'UserData';
                            }
                        } catch(e) {}
                    }
                }
            },

            /**
             * Get engine
             * @private
             * @return {String} engine
             */
            _getEngine: function() {
                if (!this.engine) {
                    throw 'No engine defined, please define an engine';
                }
                return this.engine;
            },

            /**
             * Content encode for storage
             * @param  {mixed} value   mixed to encode
             * @param  {integer} expires number of seconds
             * @return {String} BASE64 encoded string
             */
            contentEncode: function(value, expires) {
                var obj = { value: value };
                if (typeof expires !== 'undefined') {
                    var date = new Date();
                    obj.expire = date.setTime(date.getTime() + (expires*60*60*1000));
                }
                return Store.encode(JSON.stringify(obj));
            },

            /**
             * Content decode for storage
             * @param  {string} input
             * @return {mixed} BASE64 decoded mixed
             */
            contentDecode: function(input) {
                var obj =  JSON.parse(Store.decode(input));
                var date = new Date();
                if (obj.expire && obj.expire < date.getTime()) {
                    this.del(name);
                    return null;
                }
                return obj.value;
            },

            /**
             * Set based on engine type
             * @param {string} name
             * @param {mixed} value
             * @param {integer} hours
             * @return {void}
             */
            set: function(name, value, hours) {
                this['_set' + this._getEngine()](name, value, hours);
            },

            /**
             * Get based on engine type
             * @param {string} name
             * @param {mixed} value
             * @param {integer} hours
             * @return {void}
             */
            get: function(name) {
                return this['_get' + this._getEngine()](name);
            },

            /**
             * Delete based on engine type
             * @param {string} name
             * @param {mixed} value
             * @param {integer} hours
             * @return {void}
             */
            del: function(name) {
                this['_del' + this._getEngine()](name);
            },

            /**
             * Get cookie
             * @private
             * @param  {String} name
             * @return {mixed}
             */
            _getCookie: function(name) {
                var nameEQ = name + "=";
                var ca = $document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return this.contentDecode(c.substring(nameEQ.length, c.length));
                }
                return null;
            },

            /**
             * Set cookie
             * @private
             * @param {string} name
             * @param {mixed} value
             * @param {integer} hours
             * @return {void}
             */
            _setCookie: function(name, value, hours) {
                var expires = "";
                if (hours) {
                    var date = new Date();
                    date.setTime(date.getTime() + (hours*60*60*1000));
                    expires = "; expires=" + date.toGMTString();
                }
                $document.cookie = name + "=" + this.contentEncode(value) + expires + "; path=/";
            },

            /**
             * Delete cookie
             * @private
             * @param  {String} name
             * @return {void}
             */
            _delCookie: function(name) {
                this.set(name, "", -1);
            },
            /**
             * Get user data
             * @private
             * @param  {String} name
             * @return {mixed}
             * @required  Add following in index.html
             *     head: <style type="text/css"> .storeuserData { behavior: url(#default#userData); } </style>
             *     body: <form id="oPersistForm" style="display: none;"><input class="storeuserData" type="hidden" id="oPersistInput"></form>
             */
            _getUserData: function(name) {
                var oPersist = oPersistForm.oPersistInput;
                oPersist.load(name);
                var value = oPersist.getAttribute("persist");
                if (!value) return null;
                return this.contentDecode(value);
            },

            /**
             * Set user data
             * @private
             * @param {string} name
             * @param {mixed} value
             * @param {integer} hours
             * @return {void}
             */
            _setUserData: function(name, value, hours) {
                var oPersist=oPersistForm.oPersistInput;
                oPersist.setAttribute("persist", this.contentEncode(value, hours));
                oPersist.save(name);
            },

            /**
             * Delete user data
             * @private
             * @param {string} name
             * @return {void}
             */
            _delUserData: function(name) {
                var oPersist=oPersistForm.oPersistInput;
                oPersist.removeAttribute("persist");
                oPersist.save(name);
            },

            /**
             * Get localStorage
             * @private
             * @param  {String} name
             * @return {mixed}
             */
            _getLocalStorage: function(name) {
                var item = localStorage.getItem(name);
                if (!item) return null;
                return this.contentDecode(item);
            },

            /**
             * Set localStorage
             * @private
             * @param {string} name
             * @param {mixed} value
             * @param {integer} hours
             * @return {void}
             */
            _setLocalStorage: function(name, value, hours) {
                localStorage.setItem(name, this.contentEncode(value, hours));
            },

            /**
             * Delete localStorage
             * @private
             * @param {string} name
             * @return {void}
             */
            _delLocalStorage: function(name) {
                localStorage.removeItem(name);
            }
        };

        // Set store engine
        Store.setEngine();

        return Store;

  }]);
