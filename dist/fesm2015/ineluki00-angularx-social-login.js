import { __decorate } from 'tslib';
import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

var AuthService_1;
class AuthServiceConfig {
    constructor(providers) {
        this.lazyLoad = false;
        this.providers = new Map();
        for (let i = 0; i < providers.length; i++) {
            let element = providers[i];
            this.providers.set(element.id, element.provider);
            this.lazyLoad = this.lazyLoad || element.lazyLoad;
        }
    }
}
let AuthService = AuthService_1 = class AuthService {
    constructor(config) {
        this._user = null;
        this._authState = new ReplaySubject(1);
        this._readyState = new BehaviorSubject([]);
        this.initialized = false;
        this.providers = config.providers;
        if (!config.lazyLoad) {
            this.initialize();
        }
    }
    get authState() {
        return this._authState.asObservable();
    }
    /** Provides an array of provider ID's as they become ready */
    get readyState() {
        return this._readyState.asObservable();
    }
    initialize() {
        this.initialized = true;
        this.providers.forEach((provider, key) => {
            provider.initialize().then(() => {
                let readyProviders = this._readyState.getValue();
                readyProviders.push(key);
                this._readyState.next(readyProviders);
                provider.getLoginStatus().then((user) => {
                    user.provider = key;
                    this._user = user;
                    this._authState.next(user);
                }).catch((err) => {
                    this._authState.next(null);
                });
            });
        });
    }
    signIn(providerId, opt) {
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise((resolve, reject) => {
            let providerObject = this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn(opt).then((user) => {
                    user.provider = providerId;
                    resolve(user);
                    this._user = user;
                    this._authState.next(user);
                }).catch(err => {
                    reject(err);
                });
            }
            else {
                reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    }
    signOut(revoke = false) {
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject(AuthService_1.ERR_NOT_LOGGED_IN);
            }
            else {
                let providerId = this._user.provider;
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut(revoke).then(() => {
                        resolve();
                        this._user = null;
                        this._authState.next(null);
                    }).catch((err) => {
                        reject(err);
                    });
                }
                else {
                    reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
};
AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
AuthService.ctorParameters = () => [
    { type: AuthServiceConfig }
];
AuthService = AuthService_1 = __decorate([
    Injectable()
], AuthService);

var SocialLoginModule_1;
function configFactory(config) {
    return config;
}
let SocialLoginModule = SocialLoginModule_1 = class SocialLoginModule {
    static initialize(config) {
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
    }
};
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

class SocialUser {
}

class BaseLoginProvider {
    constructor() {
        this._readyState = new BehaviorSubject(false);
    }
    onReady() {
        return new Promise((resolve, reject) => {
            this._readyState.subscribe((isReady) => {
                if (isReady) {
                    resolve();
                }
            });
        });
    }
    loadScript(id, src, onload, async = true, inner_text_content = '') {
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
            let signInJS = document.createElement('script');
            signInJS.async = async;
            signInJS.src = src;
            signInJS.onload = onload;
            /*
            if (inner_text_content) // LinkedIn
                signInJS.text = inner_text_content;
            */
            document.head.appendChild(signInJS);
        }
    }
}

class GoogleLoginProvider extends BaseLoginProvider {
    constructor(clientId, opt = { scope: 'email' }) {
        super();
        this.clientId = clientId;
        this.opt = opt;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', () => {
                gapi.load('auth2', () => {
                    this.auth2 = gapi.auth2.init(Object.assign({}, this.opt, { client_id: this.clientId }));
                    this.auth2.then(() => {
                        this._readyState.next(true);
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                if (this.auth2.isSignedIn.get()) {
                    let user = new SocialUser();
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
    }
    signIn(opt) {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                const offlineAccess = (opt && opt.offline_access) || (this.opt && this.opt.offline_access);
                let promise = !offlineAccess ? this.auth2.signIn(opt) : this.auth2.grantOfflineAccess(opt);
                promise.then((response) => {
                    let user = new SocialUser();
                    if (response && response.code) {
                        user.authorizationCode = response.code;
                    }
                    else {
                        let profile = this.auth2.currentUser.get().getBasicProfile();
                        let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                        let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
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
                }, (closed) => {
                    reject('User cancelled login or did not fully authorize.');
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    signOut(revoke) {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                let signOutPromise;
                if (revoke) {
                    signOutPromise = this.auth2.disconnect();
                }
                else {
                    signOutPromise = this.auth2.signOut();
                }
                signOutPromise.then((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
}
GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';

class FacebookLoginProvider extends BaseLoginProvider {
    constructor(clientId, opt = { scope: 'email,public_profile' }, locale = 'en_US', fields = 'name,email,picture,first_name,last_name', version = 'v4.0') {
        super();
        this.clientId = clientId;
        this.opt = opt;
        this.locale = locale;
        this.fields = fields;
        this.version = version;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.locale}/sdk.js`, () => {
                FB.init({
                    appId: this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: this.version
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                this._readyState.next(true);
                resolve();
            });
        });
    }
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                FB.getLoginStatus((response) => {
                    if (response.status === 'connected') {
                        let authResponse = response.authResponse;
                        FB.api(`/me?fields=${this.fields}`, (fbUser) => {
                            let user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse.accessToken;
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
    }
    signIn(opt) {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                FB.login((response) => {
                    if (response.authResponse) {
                        let authResponse = response.authResponse;
                        FB.api(`/me?fields=${this.fields}`, (fbUser) => {
                            let user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        });
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }, this.opt);
            });
        });
    }
    signOut() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                FB.logout((response) => {
                    resolve();
                });
            });
        });
    }
}
FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';

/**
 * Generated bundle index. Do not edit.
 */

export { AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule, SocialUser, BaseLoginProvider as ɵa };
//# sourceMappingURL=ineluki00-angularx-social-login.js.map
