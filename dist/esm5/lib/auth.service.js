import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
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
export { AuthServiceConfig };
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
    AuthService = AuthService_1 = tslib_1.__decorate([
        Injectable()
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsibGliL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQWlGbEU7SUFJRSwyQkFBWSxTQUFrQztRQUg5QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBK0IsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFHdkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7O0FBR0Q7SUFxQkUscUJBQVksTUFBeUI7UUFkN0IsVUFBSyxHQUFlLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQThCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELGdCQUFXLEdBQThCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBVzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUVsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNwQixJ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QixDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsSUFBSSxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ3JDLElBQUksY0FBYyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLGNBQWMsRUFBRTtvQkFDbEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ2xDLE9BQU8sRUFBRSxDQUFDO3dCQUVWLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNsQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRzt3QkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLGFBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUNsRDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztJQTlGdUIsd0NBQTRCLEdBQUcsMEJBQTBCLENBQUM7SUFDMUQsNkJBQWlCLEdBQUcsZUFBZSxDQUFDOztnQkFrQnhDLGlCQUFpQjs7SUFyQjFCLFdBQVc7UUFEdkIsVUFBVSxFQUFFO09BQ0EsV0FBVyxDQWtHdkI7SUFBRCxrQkFBQztDQUFBLEFBbEdELElBa0dDO1NBbEdZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IExvZ2luUHJvdmlkZXIgfSBmcm9tICcuL2VudGl0aWVzL2xvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4vZW50aXRpZXMvdXNlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhTZXJ2aWNlQ29uZmlnSXRlbSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBwcm92aWRlcjogTG9naW5Qcm92aWRlcjtcclxuICAvKipcclxuICAgKiBUaGlzIGZpZWxkIGFsbG93cyB0byBsb2FkIGxvZ2luIHByb3ZpZGVycyBTREtzIGxhemlseS5cclxuICAgKiBMYXp5IGxvYWRpbmcgaXMgYWN0aXZhdGVkIGlmIGl0J3MgdHJ1ZSBhbmQgdmljZSB2ZXJzYS5cclxuICAgKi9cclxuICBsYXp5TG9hZD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9naW5PcHQge1xyXG4gIC8qKlxyXG4gICAqIEZhY2Vib29rIEZCLmxvZ2luIG9wdGlvbnM6IGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9yZWZlcmVuY2UvamF2YXNjcmlwdC9GQi5sb2dpbi92Mi4xMS5cclxuICAgKi9cclxuICBhdXRoX3R5cGU/OiBzdHJpbmc7IC8vIE9wdGlvbmFsIGtleSwgb25seSBzdXBwb3J0cyBvbmUgdmFsdWU6IHJlcmVxdWVzdC4gVXNlIHRoaXMgd2hlbiByZS1yZXF1ZXN0aW5nIGEgZGVjbGluZWQgcGVybWlzc2lvbi5cclxuICBzY29wZT86IHN0cmluZzsgLy8gQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgZXh0ZW5kZWQgcGVybWlzc2lvbnNcclxuICByZXR1cm5fc2NvcGVzPzogYm9vbGVhbjsgLy8gV2hlbiB0cnVlLCB0aGUgZ3JhbnRlZCBzY29wZXMgd2lsbCBiZSByZXR1cm5lZCBpbiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0LlxyXG4gIGVuYWJsZV9wcm9maWxlX3NlbGVjdG9yPzogYm9vbGVhbjsgLy8gV2hlbiB0cnVlLCBwcm9tcHQgdGhlIHVzZXIgdG8gZ3JhbnQgcGVybWlzc2lvbiBmb3Igb25lIG9yIG1vcmUgUGFnZXMuXHJcbiAgcHJvZmlsZV9zZWxlY3Rvcl9pZHM/OiBzdHJpbmc7IC8vIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIElEcyB0byBkaXNwbGF5IGluIHRoZSBwcm9maWxlIHNlbGVjdG9yXHJcbiAgLyoqXHJcbiAgICogR29vZ2xlIGdhcGkuYXV0aDIuQ2xpZW50Q29uZmlnOiBcXFxyXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FwaS1jbGllbnQtbGlicmFyeS9qYXZhc2NyaXB0L3JlZmVyZW5jZS9yZWZlcmVuY2Vkb2NzI2dhcGlhdXRoMmNsaWVudGNvbmZpZy5cclxuICAgKi9cclxuICAvKiBSZXF1aXJlZC4gVGhlIGFwcCdzIGNsaWVudCBJRCwgZm91bmQgYW5kIGNyZWF0ZWQgaW4gdGhlIEdvb2dsZSBEZXZlbG9wZXJzIENvbnNvbGUuKi9cclxuICBjbGllbnRfaWQ/OiBzdHJpbmc7XHJcbiAgLyogVGhlIGRvbWFpbnMgZm9yIHdoaWNoIHRvIGNyZWF0ZSBzaWduLWluIGNvb2tpZXMuIEVpdGhlciBhIFVSSSxcclxuICBzaW5nbGVfaG9zdF9vcmlnaW4sIG9yIG5vbmUuIERlZmF1bHRzIHRvIHNpbmdsZV9ob3N0X29yaWdpbiBpZiB1bnNwZWNpZmllZC4gKi9cclxuICBjb29raWVfcG9saWN5Pzogc3RyaW5nO1xyXG4gIC8qIEZldGNoIHVzZXJzJyBiYXNpYyBwcm9maWxlIGluZm9ybWF0aW9uIHdoZW4gdGhleSBzaWduIGluLiBBZGRzICdwcm9maWxlJyxcclxuICAnZW1haWwnIGFuZCAnb3BlbmlkJyB0byB0aGUgcmVxdWVzdGVkIHNjb3Blcy4gVHJ1ZSBpZiB1bnNwZWNpZmllZC4gKi9cclxuICBmZXRjaF9iYXNpY19wcm9maWxlPzogYm9vbGVhbjtcclxuICAvKiBUaGUgRyBTdWl0ZSBkb21haW4gdG8gd2hpY2ggdXNlcnMgbXVzdCBiZWxvbmcgdG8gc2lnbiBpbi5cclxuICBUaGlzIGlzIHN1c2NlcHRpYmxlIHRvIG1vZGlmaWNhdGlvbiBieSBjbGllbnRzLCBzbyBiZSBzdXJlIHRvIHZlcmlmeVxyXG4gIHRoZSBob3N0ZWQgZG9tYWluIHByb3BlcnR5IG9mIHRoZSByZXR1cm5lZCB1c2VyLlxyXG4gIFVzZSBHb29nbGVVc2VyLmdldEhvc3RlZERvbWFpbigpIG9uIHRoZSBjbGllbnQsIGFuZCB0aGUgaGQgY2xhaW0gaW5cclxuICB0aGUgSUQgVG9rZW4gb24gdGhlIHNlcnZlciB0byB2ZXJpZnkgdGhlIGRvbWFpbiBpcyB3aGF0IHlvdSBleHBlY3RlZC4gKi9cclxuICBob3N0ZWRfZG9tYWluPzogc3RyaW5nO1xyXG4gIC8qIFVzZWQgb25seSBmb3IgT3BlbklEIDIuMCBjbGllbnQgbWlncmF0aW9uLiBTZXQgdG8gdGhlIHZhbHVlXHJcbiAgb2YgdGhlIHJlYWxtIHRoYXQgeW91IGFyZSBjdXJyZW50bHkgdXNpbmcgZm9yIE9wZW5JRCAyLjAsXHJcbiAgYXMgZGVzY3JpYmVkIGluIE9wZW5JRCAyLjAgKE1pZ3JhdGlvbikuICovXHJcbiAgb3BlbmlkX3JlYWxtPzogc3RyaW5nO1xyXG4gIC8qIFRoZSBVWCBtb2RlIHRvIHVzZSBmb3IgdGhlIHNpZ24taW4gZmxvdy4gQnkgZGVmYXVsdCwgaXQgd2lsbCBvcGVuIHRoZSBjb25zZW50IGZsb3cgaW4gYSBwb3B1cC4gVmFsaWQgdmFsdWVzIGFyZSBwb3B1cCBhbmQgcmVkaXJlY3QuICovXHJcbiAgdXhfbW9kZT86IHN0cmluZztcclxuICAvKiBJZiB1c2luZyB1eF9tb2RlPSdyZWRpcmVjdCcsIHRoaXMgcGFyYW1ldGVyIGFsbG93cyB5b3UgdG8gb3ZlcnJpZGVcclxuICB0aGUgZGVmYXVsdCByZWRpcmVjdF91cmkgdGhhdCB3aWxsIGJlIHVzZWQgYXQgdGhlIGVuZCBvZiB0aGUgY29uc2VudCBmbG93LlxyXG4gIFRoZSBkZWZhdWx0IHJlZGlyZWN0X3VyaSBpcyB0aGUgY3VycmVudCBVUkwgc3RyaXBwZWQgb2YgcXVlcnkgcGFyYW1ldGVyc1xyXG4gIGFuZCBoYXNoIGZyYWdtZW50LiAqL1xyXG4gIHJlZGlyZWN0X3VyaT86IHN0cmluZztcclxuICAvKiBHZXQgcGVybWlzc2lvbiBmcm9tIHRoZSB1c2VyIHRvIGFjY2VzcyB0aGUgc3BlY2lmaWVkIHNjb3BlcyBvZmZsaW5lLFxyXG4gICAqIElmIHVzaW5nIG9mZmxpbmVfYWNjZXNzPXRydWUsIEdvb2dsZUF1dGguZ3JhbnRPZmZsaW5lQWNjZXNzKCkgd2lsbCBiZSB1c2UgaW5zdGVhZCBvZiBHb29nbGVBdXRoLnNpZ25JbigpXHJcbiAgICovXHJcbiAgb2ZmbGluZV9hY2Nlc3M/OiBib29sZWFuO1xyXG4gIC8qXHJcbiAgIEEgc3BhY2UtZGVsaW1pdGVkIGxpc3Qgb2Ygc3RyaW5nIHZhbHVlcyB0aGF0IHNwZWNpZmllcyB3aGV0aGVyIHRoZSBhdXRob3JpemF0aW9uIHNlcnZlciBwcm9tcHRzIHRoZSB1c2VyIGZvciByZWF1dGhlbnRpY2F0aW9uXHJcbiAgIGFuZCBjb25zZW50LiBUaGUgcG9zc2libGUgdmFsdWVzIGFyZTpcclxuICAgIG5vbmVcclxuICAgICAgVGhlIGF1dGhvcml6YXRpb24gc2VydmVyIGRvZXMgbm90IGRpc3BsYXkgYW55IGF1dGhlbnRpY2F0aW9uIG9yIHVzZXIgY29uc2VudCBzY3JlZW5zOyBpdCB3aWxsIHJldHVybiBhbiBlcnJvciBpZiB0aGUgdXNlciBpcyBub3RcclxuICAgICAgYWxyZWFkeSBhdXRoZW50aWNhdGVkIGFuZCBoYXMgbm90IHByZS1jb25maWd1cmVkIGNvbnNlbnQgZm9yIHRoZSByZXF1ZXN0ZWQgc2NvcGVzLiBZb3UgY2FuIHVzZSBub25lIHRvIGNoZWNrIGZvciBleGlzdGluZ1xyXG4gICAgICBhdXRoZW50aWNhdGlvbiBhbmQvb3IgY29uc2VudC5cclxuICAgIGNvbnNlbnRcclxuICAgICAgVGhlIGF1dGhvcml6YXRpb24gc2VydmVyIHByb21wdHMgdGhlIHVzZXIgZm9yIGNvbnNlbnQgYmVmb3JlIHJldHVybmluZyBpbmZvcm1hdGlvbiB0byB0aGUgY2xpZW50LlxyXG4gICAgc2VsZWN0X2FjY291bnRcclxuICAgICAgVGhlIGF1dGhvcml6YXRpb24gc2VydmVyIHByb21wdHMgdGhlIHVzZXIgdG8gc2VsZWN0IGEgdXNlciBhY2NvdW50LiBUaGlzIGFsbG93cyBhIHVzZXIgd2hvIGhhcyBtdWx0aXBsZSBhY2NvdW50cyBhdCB0aGUgYXV0aG9yaXphdGlvblxyXG4gICAgICBzZXJ2ZXIgdG8gc2VsZWN0IGFtb25nc3QgdGhlIG11bHRpcGxlIGFjY291bnRzIHRoYXQgdGhleSBtYXkgaGF2ZSBjdXJyZW50IHNlc3Npb25zIGZvci5cclxuXHJcbiAgIElmIG5vIHZhbHVlIGlzIHNwZWNpZmllZCBhbmQgdGhlIHVzZXIgaGFzIG5vdCBwcmV2aW91c2x5IGF1dGhvcml6ZWQgYWNjZXNzLCB0aGVuIHRoZSB1c2VyIGlzIHNob3duIGEgY29uc2VudCBzY3JlZW4uXHJcbiAgKi9cclxuICBwcm9tcHQ/OiBzdHJpbmc7XHJcbiAgLypcclxuICAgIFRoZSBlbWFpbCwgb3IgVXNlciBJRCwgb2YgYSB1c2VyIHRvIHByZS1zZWxlY3QgaW4gdGhlIHNpZ24taW4gZmxvdy4gXHJcbiAgICBUaGlzIGlzIHN1c2NlcHRpYmxlIHRvIG1vZGlmaWNhdGlvbiBieSB0aGUgdXNlciwgdW5sZXNzIHByb21wdDogXCJub25lXCIgaXMgdXNlZC5cclxuICAqL1xyXG4gIGxvZ2luX2hpbnQ/OiBzdHJpbmc7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2VDb25maWcge1xyXG4gIGxhenlMb2FkID0gZmFsc2U7XHJcbiAgcHJvdmlkZXJzOiBNYXA8c3RyaW5nLCBMb2dpblByb3ZpZGVyPiA9IG5ldyBNYXA8c3RyaW5nLCBMb2dpblByb3ZpZGVyPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm92aWRlcnM6IEF1dGhTZXJ2aWNlQ29uZmlnSXRlbVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IHByb3ZpZGVyc1tpXTtcclxuICAgICAgdGhpcy5wcm92aWRlcnMuc2V0KGVsZW1lbnQuaWQsIGVsZW1lbnQucHJvdmlkZXIpO1xyXG4gICAgICB0aGlzLmxhenlMb2FkID0gdGhpcy5sYXp5TG9hZCB8fCBlbGVtZW50LmxhenlMb2FkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EID0gJ0xvZ2luIHByb3ZpZGVyIG5vdCBmb3VuZCc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRVJSX05PVF9MT0dHRURfSU4gPSAnTm90IGxvZ2dlZCBpbic7XHJcblxyXG4gIHByaXZhdGUgcHJvdmlkZXJzOiBNYXA8c3RyaW5nLCBMb2dpblByb3ZpZGVyPjtcclxuXHJcbiAgcHJpdmF0ZSBfdXNlcjogU29jaWFsVXNlciA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfYXV0aFN0YXRlOiBSZXBsYXlTdWJqZWN0PFNvY2lhbFVzZXI+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XHJcbiAgcHJpdmF0ZSBfcmVhZHlTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XHJcblxyXG4gIGdldCBhdXRoU3RhdGUoKTogT2JzZXJ2YWJsZTxTb2NpYWxVc2VyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXV0aFN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuICAvKiogUHJvdmlkZXMgYW4gYXJyYXkgb2YgcHJvdmlkZXIgSUQncyBhcyB0aGV5IGJlY29tZSByZWFkeSAqL1xyXG4gIGdldCByZWFkeVN0YXRlKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcclxuICAgIHJldHVybiB0aGlzLl9yZWFkeVN0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBBdXRoU2VydmljZUNvbmZpZykge1xyXG4gICAgdGhpcy5wcm92aWRlcnMgPSBjb25maWcucHJvdmlkZXJzO1xyXG5cclxuICAgIGlmICghY29uZmlnLmxhenlMb2FkKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xyXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB0aGlzLnByb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcjogTG9naW5Qcm92aWRlciwga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgcHJvdmlkZXIuaW5pdGlhbGl6ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGxldCByZWFkeVByb3ZpZGVycyA9IHRoaXMuX3JlYWR5U3RhdGUuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZWFkeVByb3ZpZGVycy5wdXNoKGtleSk7XHJcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZS5uZXh0KHJlYWR5UHJvdmlkZXJzKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXIuZ2V0TG9naW5TdGF0dXMoKS50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgICB1c2VyLnByb3ZpZGVyID0ga2V5O1xyXG5cclxuICAgICAgICAgIHRoaXMuX3VzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQodXNlcik7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzaWduSW4ocHJvdmlkZXJJZDogc3RyaW5nLCBvcHQ/OiBMb2dpbk9wdCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xyXG4gICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcclxuICAgICAgICBwcm92aWRlck9iamVjdC5zaWduSW4ob3B0KS50aGVuKCh1c2VyOiBTb2NpYWxVc2VyKSA9PiB7XHJcbiAgICAgICAgICB1c2VyLnByb3ZpZGVyID0gcHJvdmlkZXJJZDtcclxuICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcblxyXG4gICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XHJcbiAgICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dCh1c2VyKTtcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVqZWN0KEF1dGhTZXJ2aWNlLkVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25PdXQocmV2b2tlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5fdXNlcikge1xyXG4gICAgICAgIHJlamVjdChBdXRoU2VydmljZS5FUlJfTk9UX0xPR0dFRF9JTik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHByb3ZpZGVySWQgPSB0aGlzLl91c2VyLnByb3ZpZGVyO1xyXG4gICAgICAgIGxldCBwcm92aWRlck9iamVjdCA9IHRoaXMucHJvdmlkZXJzLmdldChwcm92aWRlcklkKTtcclxuICAgICAgICBpZiAocHJvdmlkZXJPYmplY3QpIHtcclxuICAgICAgICAgIHByb3ZpZGVyT2JqZWN0LnNpZ25PdXQocmV2b2tlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZS5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==