(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ineluki00/angularx-social-login', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory((global.ineluki00 = global.ineluki00 || {}, global.ineluki00['angularx-social-login'] = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, core, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var AuthServiceConfig = /** @class */ (function () {
        function AuthServiceConfig(providers) {
            this.lazyLoad = false;
            this.providers = new Map();
            for (var i = 0; i < providers.length; i++) {
                var element = providers[i];
                this.providers.set(element.id, element.provider);
                this.lazyLoad = this.lazyLoad || element.lazyLoad;
            }
        }
        return AuthServiceConfig;
    }());
    var AuthService = /** @class */ (function () {
        function AuthService(config) {
            this._user = null;
            this._authState = new rxjs.ReplaySubject(1);
            this._readyState = new rxjs.BehaviorSubject([]);
            this.initialized = false;
            this.providers = config.providers;
            if (!config.lazyLoad) {
                this.initialize();
            }
        }
        AuthService_1 = AuthService;
        Object.defineProperty(AuthService.prototype, "authState", {
            get: function () {
                return this._authState.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthService.prototype, "readyState", {
            /** Provides an array of provider ID's as they become ready */
            get: function () {
                return this._readyState.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        AuthService.prototype.initialize = function () {
            var _this = this;
            this.initialized = true;
            this.providers.forEach(function (provider, key) {
                provider.initialize().then(function () {
                    var readyProviders = _this._readyState.getValue();
                    readyProviders.push(key);
                    _this._readyState.next(readyProviders);
                    provider.getLoginStatus().then(function (user) {
                        user.provider = key;
                        _this._user = user;
                        _this._authState.next(user);
                    }).catch(function (err) {
                        _this._authState.next(null);
                    });
                });
            });
        };
        AuthService.prototype.signIn = function (providerId, opt) {
            var _this = this;
            if (!this.initialized) {
                this.initialize();
            }
            return new Promise(function (resolve, reject) {
                var providerObject = _this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signIn(opt).then(function (user) {
                        user.provider = providerId;
                        resolve(user);
                        _this._user = user;
                        _this._authState.next(user);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            });
        };
        AuthService.prototype.signOut = function (revoke) {
            var _this = this;
            if (revoke === void 0) { revoke = false; }
            if (!this.initialized) {
                this.initialize();
            }
            return new Promise(function (resolve, reject) {
                if (!_this._user) {
                    reject(AuthService_1.ERR_NOT_LOGGED_IN);
                }
                else {
                    var providerId = _this._user.provider;
                    var providerObject = _this.providers.get(providerId);
                    if (providerObject) {
                        providerObject.signOut(revoke).then(function () {
                            resolve();
                            _this._user = null;
                            _this._authState.next(null);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                    }
                }
            });
        };
        var AuthService_1;
        AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
        AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
        AuthService.ctorParameters = function () { return [
            { type: AuthServiceConfig }
        ]; };
        AuthService = AuthService_1 = __decorate([
            core.Injectable()
        ], AuthService);
        return AuthService;
    }());

    function configFactory(config) {
        return config;
    }
    var SocialLoginModule = /** @class */ (function () {
        function SocialLoginModule() {
        }
        SocialLoginModule_1 = SocialLoginModule;
        SocialLoginModule.initialize = function (config) {
            return {
                ngModule: SocialLoginModule_1,
                providers: [
                    AuthService,
                    {
                        provide: AuthServiceConfig,
                        useValue: config
                    }
                ]
            };
        };
        var SocialLoginModule_1;
        SocialLoginModule = SocialLoginModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule
                ],
                providers: [
                    AuthService
                ]
            })
        ], SocialLoginModule);
        return SocialLoginModule;
    }());

    var SocialUser = /** @class */ (function () {
        function SocialUser() {
        }
        return SocialUser;
    }());

    var BaseLoginProvider = /** @class */ (function () {
        function BaseLoginProvider() {
            this._readyState = new rxjs.BehaviorSubject(false);
        }
        BaseLoginProvider.prototype.onReady = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._readyState.subscribe(function (isReady) {
                    if (isReady) {
                        resolve();
                    }
                });
            });
        };
        BaseLoginProvider.prototype.loadScript = function (id, src, onload, async, inner_text_content) {
            if (async === void 0) { async = true; }
            if (inner_text_content === void 0) { inner_text_content = ''; }
            // get document if platform is only browser
            if (typeof document !== 'undefined' && !document.getElementById(id)) {
                var signInJS = document.createElement('script');
                signInJS.async = async;
                signInJS.src = src;
                signInJS.onload = onload;
                /*
                if (inner_text_content) // LinkedIn
                    signInJS.text = inner_text_content;
                */
                document.head.appendChild(signInJS);
            }
        };
        return BaseLoginProvider;
    }());

    var GoogleLoginProvider = /** @class */ (function (_super) {
        __extends(GoogleLoginProvider, _super);
        function GoogleLoginProvider(clientId, opt) {
            if (opt === void 0) { opt = { scope: 'email' }; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.opt = opt;
            return _this;
        }
        GoogleLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', function () {
                    gapi.load('auth2', function () {
                        _this.auth2 = gapi.auth2.init(__assign({}, _this.opt, { client_id: _this.clientId }));
                        _this.auth2.then(function () {
                            _this._readyState.next(true);
                            resolve();
                        }).catch(function (err) {
                            reject(err);
                        });
                    });
                });
            });
        };
        GoogleLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.onReady().then(function () {
                    if (_this.auth2.isSignedIn.get()) {
                        var user = new SocialUser();
                        // let profile = this.auth2.currentUser.get().getBasicProfile();
                        // let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                        // let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                        // user.id = profile.getId();
                        // user.name = profile.getName();
                        // user.email = profile.getEmail();
                        // user.photoUrl = profile.getImageUrl();
                        // user.firstName = profile.getGivenName();
                        // user.lastName = profile.getFamilyName();
                        // user.authToken = token;
                        // user.idToken = backendToken;
                        resolve(user);
                    }
                    else {
                        reject('No user is currently logged in.');
                    }
                });
            });
        };
        GoogleLoginProvider.prototype.signIn = function (opt) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.onReady().then(function () {
                    var offlineAccess = (opt && opt.offline_access) || (_this.opt && _this.opt.offline_access);
                    var promise = !offlineAccess ? _this.auth2.signIn(opt) : _this.auth2.grantOfflineAccess(opt);
                    promise.then(function (response) {
                        var user = new SocialUser();
                        if (response && response.code) {
                            user.authorizationCode = response.code;
                        }
                        else {
                            var profile = _this.auth2.currentUser.get().getBasicProfile();
                            var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                            var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                            user.id = profile.getId();
                            user.name = profile.getName();
                            user.email = profile.getEmail();
                            user.photoUrl = profile.getImageUrl();
                            user.firstName = profile.getGivenName();
                            user.lastName = profile.getFamilyName();
                            user.authToken = token;
                            user.idToken = backendToken;
                        }
                        resolve(user);
                    }, function (closed) {
                        reject('User cancelled login or did not fully authorize.');
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            });
        };
        GoogleLoginProvider.prototype.signOut = function (revoke) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.onReady().then(function () {
                    var signOutPromise;
                    if (revoke) {
                        signOutPromise = _this.auth2.disconnect();
                    }
                    else {
                        signOutPromise = _this.auth2.signOut();
                    }
                    signOutPromise.then(function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            });
        };
        GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
        return GoogleLoginProvider;
    }(BaseLoginProvider));

    var FacebookLoginProvider = /** @class */ (function (_super) {
        __extends(FacebookLoginProvider, _super);
        function FacebookLoginProvider(clientId, opt, locale, fields, version) {
            if (opt === void 0) { opt = { scope: 'email,public_profile' }; }
            if (locale === void 0) { locale = 'en_US'; }
            if (fields === void 0) { fields = 'name,email,picture,first_name,last_name'; }
            if (version === void 0) { version = 'v4.0'; }
            var _this = _super.call(this) || this;
            _this.clientId = clientId;
            _this.opt = opt;
            _this.locale = locale;
            _this.fields = fields;
            _this.version = version;
            return _this;
        }
        FacebookLoginProvider.prototype.initialize = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadScript(FacebookLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.locale + "/sdk.js", function () {
                    FB.init({
                        appId: _this.clientId,
                        autoLogAppEvents: true,
                        cookie: true,
                        xfbml: true,
                        version: _this.version
                    });
                    // FB.AppEvents.logPageView(); #FIX for #18
                    _this._readyState.next(true);
                    resolve();
                });
            });
        };
        FacebookLoginProvider.prototype.getLoginStatus = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.onReady().then(function () {
                    FB.getLoginStatus(function (response) {
                        if (response.status === 'connected') {
                            var authResponse_1 = response.authResponse;
                            FB.api("/me?fields=" + _this.fields, function (fbUser) {
                                var user = new SocialUser();
                                user.id = fbUser.id;
                                user.name = fbUser.name;
                                user.email = fbUser.email;
                                user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                                user.firstName = fbUser.first_name;
                                user.lastName = fbUser.last_name;
                                user.authToken = authResponse_1.accessToken;
                                user.facebook = fbUser;
                                resolve(user);
                            });
                        }
                        else {
                            reject('No user is currently logged in.');
                        }
                    });
                });
            });
        };
        FacebookLoginProvider.prototype.signIn = function (opt) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.onReady().then(function () {
                    FB.login(function (response) {
                        if (response.authResponse) {
                            var authResponse_2 = response.authResponse;
                            FB.api("/me?fields=" + _this.fields, function (fbUser) {
                                var user = new SocialUser();
                                user.id = fbUser.id;
                                user.name = fbUser.name;
                                user.email = fbUser.email;
                                user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                                user.firstName = fbUser.first_name;
                                user.lastName = fbUser.last_name;
                                user.authToken = authResponse_2.accessToken;
                                user.facebook = fbUser;
                                resolve(user);
                            });
                        }
                        else {
                            reject('User cancelled login or did not fully authorize.');
                        }
                    }, _this.opt);
                });
            });
        };
        FacebookLoginProvider.prototype.signOut = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.onReady().then(function () {
                    FB.logout(function (response) {
                        resolve();
                    });
                });
            });
        };
        FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';
        return FacebookLoginProvider;
    }(BaseLoginProvider));

    exports.AuthService = AuthService;
    exports.AuthServiceConfig = AuthServiceConfig;
    exports.FacebookLoginProvider = FacebookLoginProvider;
    exports.GoogleLoginProvider = GoogleLoginProvider;
    exports.SocialLoginModule = SocialLoginModule;
    exports.SocialUser = SocialUser;
    exports.ɵa = BaseLoginProvider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ineluki00-angularx-social-login.umd.js.map
