import { __decorate, __extends, __assign } from 'tslib';
import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

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
        this._authState = new ReplaySubject(1);
        this._readyState = new BehaviorSubject([]);
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
        Injectable()
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
        NgModule({
            imports: [
                CommonModule
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
        this._readyState = new BehaviorSubject(false);
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

/**
 * Generated bundle index. Do not edit.
 */

export { AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule, SocialUser, BaseLoginProvider as ɵa };
//# sourceMappingURL=ineluki00-angularx-social-login.js.map
