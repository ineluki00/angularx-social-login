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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGluZWx1a2kwMC9hbmd1bGFyeC1zb2NpYWwtbG9naW4vIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBaUZsRTtJQUlFLDJCQUFZLFNBQWtDO1FBSDlDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUErQixJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUd2RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQzs7QUFHRDtJQXFCRSxxQkFBWSxNQUF5QjtRQWQ3QixVQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBOEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsZ0JBQVcsR0FBOEIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakUsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFXMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRWxDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxF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LENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxJQUFJLFVBQVUsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDckMsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELElBQUksY0FBYyxFQUFFO29CQUNsQixjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDbEMsT0FBTyxFQUFFLENBQUM7d0JBRVYsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBQ2xCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO3dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDZCxDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxNQUFNLENBQUMsYUFBVyxDQUFDLDRCQUE0QixDQUFDLENBQUM7aUJBQ2xEO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0lBOUZ1Qix3Q0FBNEIsR0FBRywwQkFBMEIsQ0FBQztJQUMxRCw2QkFBaUIsR0FBRyxlQUFlLENBQUM7O2dCQWtCeEMsaUJBQWlCOztJQXJCMUIsV0FBVztRQUR2QixVQUFVLEVBQUU7T0FDQSxXQUFXLENBa0d2QjtJQUFELGtCQUFDO0NBQUEsQUFsR0QsSUFrR0M7U0FsR1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Qcm92aWRlciB9IGZyb20gJy4vZW50aXRpZXMvbG9naW4tcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBTb2NpYWxVc2VyIH0gZnJvbSAnLi9lbnRpdGllcy91c2VyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aFNlcnZpY2VDb25maWdJdGVtIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHByb3ZpZGVyOiBMb2dpblByb3ZpZGVyO1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZmllbGQgYWxsb3dzIHRvIGxvYWQgbG9naW4gcHJvdmlkZXJzIFNES3MgbGF6aWx5LlxyXG4gICAqIExhenkgbG9hZGluZyBpcyBhY3RpdmF0ZWQgaWYgaXQncyB0cnVlIGFuZCB2aWNlIHZlcnNhLlxyXG4gICAqL1xyXG4gIGxhenlMb2FkPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dpbk9wdCB7XHJcbiAgLyoqXHJcbiAgICogRmFjZWJvb2sgRkIubG9naW4gb3B0aW9uczogaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL3JlZmVyZW5jZS9qYXZhc2NyaXB0L0ZCLmxvZ2luL3YyLjExLlxyXG4gICAqL1xyXG4gIGF1dGhfdHlwZT86IHN0cmluZzsgLy8gT3B0aW9uYWwga2V5LCBvbmx5IHN1cHBvcnRzIG9uZSB2YWx1ZTogcmVyZXF1ZXN0LiBVc2UgdGhpcyB3aGVuIHJlLXJlcXVlc3RpbmcgYSBkZWNsaW5lZCBwZXJtaXNzaW9uLlxyXG4gIHNjb3BlPzogc3RyaW5nOyAvLyBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBleHRlbmRlZCBwZXJtaXNzaW9uc1xyXG4gIHJldHVybl9zY29wZXM/OiBib29sZWFuOyAvLyBXaGVuIHRydWUsIHRoZSBncmFudGVkIHNjb3BlcyB3aWxsIGJlIHJldHVybmVkIGluIGEgY29tbWEtc2VwYXJhdGVkIGxpc3QuXHJcbiAgZW5hYmxlX3Byb2ZpbGVfc2VsZWN0b3I/OiBib29sZWFuOyAvLyBXaGVuIHRydWUsIHByb21wdCB0aGUgdXNlciB0byBncmFudCBwZXJtaXNzaW9uIGZvciBvbmUgb3IgbW9yZSBQYWdlcy5cclxuICBwcm9maWxlX3NlbGVjdG9yX2lkcz86IHN0cmluZzsgLy8gQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgSURzIHRvIGRpc3BsYXkgaW4gdGhlIHByb2ZpbGUgc2VsZWN0b3JcclxuICAvKipcclxuICAgKiBHb29nbGUgZ2FwaS5hdXRoMi5DbGllbnRDb25maWc6IFxcXHJcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYXBpLWNsaWVudC1saWJyYXJ5L2phdmFzY3JpcHQvcmVmZXJlbmNlL3JlZmVyZW5jZWRvY3MjZ2FwaWF1dGgyY2xpZW50Y29uZmlnLlxyXG4gICAqL1xyXG4gIC8qIFJlcXVpcmVkLiBUaGUgYXBwJ3MgY2xpZW50IElELCBmb3VuZCBhbmQgY3JlYXRlZCBpbiB0aGUgR29vZ2xlIERldmVsb3BlcnMgQ29uc29sZS4qL1xyXG4gIGNsaWVudF9pZD86IHN0cmluZztcclxuICAvKiBUaGUgZG9tYWlucyBmb3Igd2hpY2ggdG8gY3JlYXRlIHNpZ24taW4gY29va2llcy4gRWl0aGVyIGEgVVJJLFxyXG4gIHNpbmdsZV9ob3N0X29yaWdpbiwgb3Igbm9uZS4gRGVmYXVsdHMgdG8gc2luZ2xlX2hvc3Rfb3JpZ2luIGlmIHVuc3BlY2lmaWVkLiAqL1xyXG4gIGNvb2tpZV9wb2xpY3k/OiBzdHJpbmc7XHJcbiAgLyogRmV0Y2ggdXNlcnMnIGJhc2ljIHByb2ZpbGUgaW5mb3JtYXRpb24gd2hlbiB0aGV5IHNpZ24gaW4uIEFkZHMgJ3Byb2ZpbGUnLFxyXG4gICdlbWFpbCcgYW5kICdvcGVuaWQnIHRvIHRoZSByZXF1ZXN0ZWQgc2NvcGVzLiBUcnVlIGlmIHVuc3BlY2lmaWVkLiAqL1xyXG4gIGZldGNoX2Jhc2ljX3Byb2ZpbGU/OiBib29sZWFuO1xyXG4gIC8qIFRoZSBHIFN1aXRlIGRvbWFpbiB0byB3aGljaCB1c2VycyBtdXN0IGJlbG9uZyB0byBzaWduIGluLlxyXG4gIFRoaXMgaXMgc3VzY2VwdGlibGUgdG8gbW9kaWZpY2F0aW9uIGJ5IGNsaWVudHMsIHNvIGJlIHN1cmUgdG8gdmVyaWZ5XHJcbiAgdGhlIGhvc3RlZCBkb21haW4gcHJvcGVydHkgb2YgdGhlIHJldHVybmVkIHVzZXIuXHJcbiAgVXNlIEdvb2dsZVVzZXIuZ2V0SG9zdGVkRG9tYWluKCkgb24gdGhlIGNsaWVudCwgYW5kIHRoZSBoZCBjbGFpbSBpblxyXG4gIHRoZSBJRCBUb2tlbiBvbiB0aGUgc2VydmVyIHRvIHZlcmlmeSB0aGUgZG9tYWluIGlzIHdoYXQgeW91IGV4cGVjdGVkLiAqL1xyXG4gIGhvc3RlZF9kb21haW4/OiBzdHJpbmc7XHJcbiAgLyogVXNlZCBvbmx5IGZvciBPcGVuSUQgMi4wIGNsaWVudCBtaWdyYXRpb24uIFNldCB0byB0aGUgdmFsdWVcclxuICBvZiB0aGUgcmVhbG0gdGhhdCB5b3UgYXJlIGN1cnJlbnRseSB1c2luZyBmb3IgT3BlbklEIDIuMCxcclxuICBhcyBkZXNjcmliZWQgaW4gT3BlbklEIDIuMCAoTWlncmF0aW9uKS4gKi9cclxuICBvcGVuaWRfcmVhbG0/OiBzdHJpbmc7XHJcbiAgLyogVGhlIFVYIG1vZGUgdG8gdXNlIGZvciB0aGUgc2lnbi1pbiBmbG93LiBCeSBkZWZhdWx0LCBpdCB3aWxsIG9wZW4gdGhlIGNvbnNlbnQgZmxvdyBpbiBhIHBvcHVwLiBWYWxpZCB2YWx1ZXMgYXJlIHBvcHVwIGFuZCByZWRpcmVjdC4gKi9cclxuICB1eF9tb2RlPzogc3RyaW5nO1xyXG4gIC8qIElmIHVzaW5nIHV4X21vZGU9J3JlZGlyZWN0JywgdGhpcyBwYXJhbWV0ZXIgYWxsb3dzIHlvdSB0byBvdmVycmlkZVxyXG4gIHRoZSBkZWZhdWx0IHJlZGlyZWN0X3VyaSB0aGF0IHdpbGwgYmUgdXNlZCBhdCB0aGUgZW5kIG9mIHRoZSBjb25zZW50IGZsb3cuXHJcbiAgVGhlIGRlZmF1bHQgcmVkaXJlY3RfdXJpIGlzIHRoZSBjdXJyZW50IFVSTCBzdHJpcHBlZCBvZiBxdWVyeSBwYXJhbWV0ZXJzXHJcbiAgYW5kIGhhc2ggZnJhZ21lbnQuICovXHJcbiAgcmVkaXJlY3RfdXJpPzogc3RyaW5nO1xyXG4gIC8qIEdldCBwZXJtaXNzaW9uIGZyb20gdGhlIHVzZXIgdG8gYWNjZXNzIHRoZSBzcGVjaWZpZWQgc2NvcGVzIG9mZmxpbmUsXHJcbiAgICogSWYgdXNpbmcgb2ZmbGluZV9hY2Nlc3M9dHJ1ZSwgR29vZ2xlQXV0aC5ncmFudE9mZmxpbmVBY2Nlc3MoKSB3aWxsIGJlIHVzZSBpbnN0ZWFkIG9mIEdvb2dsZUF1dGguc2lnbkluKClcclxuICAgKi9cclxuICBvZmZsaW5lX2FjY2Vzcz86IGJvb2xlYW47XHJcbiAgLypcclxuICAgQSBzcGFjZS1kZWxpbWl0ZWQgbGlzdCBvZiBzdHJpbmcgdmFsdWVzIHRoYXQgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIGF1dGhvcml6YXRpb24gc2VydmVyIHByb21wdHMgdGhlIHVzZXIgZm9yIHJlYXV0aGVudGljYXRpb25cclxuICAgYW5kIGNvbnNlbnQuIFRoZSBwb3NzaWJsZSB2YWx1ZXMgYXJlOlxyXG4gICAgbm9uZVxyXG4gICAgICBUaGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgZG9lcyBub3QgZGlzcGxheSBhbnkgYXV0aGVudGljYXRpb24gb3IgdXNlciBjb25zZW50IHNjcmVlbnM7IGl0IHdpbGwgcmV0dXJuIGFuIGVycm9yIGlmIHRoZSB1c2VyIGlzIG5vdFxyXG4gICAgICBhbHJlYWR5IGF1dGhlbnRpY2F0ZWQgYW5kIGhhcyBub3QgcHJlLWNvbmZpZ3VyZWQgY29uc2VudCBmb3IgdGhlIHJlcXVlc3RlZCBzY29wZXMuIFlvdSBjYW4gdXNlIG5vbmUgdG8gY2hlY2sgZm9yIGV4aXN0aW5nXHJcbiAgICAgIGF1dGhlbnRpY2F0aW9uIGFuZC9vciBjb25zZW50LlxyXG4gICAgY29uc2VudFxyXG4gICAgICBUaGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgcHJvbXB0cyB0aGUgdXNlciBmb3IgY29uc2VudCBiZWZvcmUgcmV0dXJuaW5nIGluZm9ybWF0aW9uIHRvIHRoZSBjbGllbnQuXHJcbiAgICBzZWxlY3RfYWNjb3VudFxyXG4gICAgICBUaGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgcHJvbXB0cyB0aGUgdXNlciB0byBzZWxlY3QgYSB1c2VyIGFjY291bnQuIFRoaXMgYWxsb3dzIGEgdXNlciB3aG8gaGFzIG11bHRpcGxlIGFjY291bnRzIGF0IHRoZSBhdXRob3JpemF0aW9uXHJcbiAgICAgIHNlcnZlciB0byBzZWxlY3QgYW1vbmdzdCB0aGUgbXVsdGlwbGUgYWNjb3VudHMgdGhhdCB0aGV5IG1heSBoYXZlIGN1cnJlbnQgc2Vzc2lvbnMgZm9yLlxyXG5cclxuICAgSWYgbm8gdmFsdWUgaXMgc3BlY2lmaWVkIGFuZCB0aGUgdXNlciBoYXMgbm90IHByZXZpb3VzbHkgYXV0aG9yaXplZCBhY2Nlc3MsIHRoZW4gdGhlIHVzZXIgaXMgc2hvd24gYSBjb25zZW50IHNjcmVlbi5cclxuICAqL1xyXG4gIHByb21wdD86IHN0cmluZztcclxuICAvKlxyXG4gICAgVGhlIGVtYWlsLCBvciBVc2VyIElELCBvZiBhIHVzZXIgdG8gcHJlLXNlbGVjdCBpbiB0aGUgc2lnbi1pbiBmbG93LiBcclxuICAgIFRoaXMgaXMgc3VzY2VwdGlibGUgdG8gbW9kaWZpY2F0aW9uIGJ5IHRoZSB1c2VyLCB1bmxlc3MgcHJvbXB0OiBcIm5vbmVcIiBpcyB1c2VkLlxyXG4gICovXHJcbiAgbG9naW5faGludD86IHN0cmluZztcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZUNvbmZpZyB7XHJcbiAgbGF6eUxvYWQgPSBmYWxzZTtcclxuICBwcm92aWRlcnM6IE1hcDxzdHJpbmcsIExvZ2luUHJvdmlkZXI+ID0gbmV3IE1hcDxzdHJpbmcsIExvZ2luUHJvdmlkZXI+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyczogQXV0aFNlcnZpY2VDb25maWdJdGVtW10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gcHJvdmlkZXJzW2ldO1xyXG4gICAgICB0aGlzLnByb3ZpZGVycy5zZXQoZWxlbWVudC5pZCwgZWxlbWVudC5wcm92aWRlcik7XHJcbiAgICAgIHRoaXMubGF6eUxvYWQgPSB0aGlzLmxhenlMb2FkIHx8IGVsZW1lbnQubGF6eUxvYWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEVSUl9MT0dJTl9QUk9WSURFUl9OT1RfRk9VTkQgPSAnTG9naW4gcHJvdmlkZXIgbm90IGZvdW5kJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFUlJfTk9UX0xPR0dFRF9JTiA9ICdOb3QgbG9nZ2VkIGluJztcclxuXHJcbiAgcHJpdmF0ZSBwcm92aWRlcnM6IE1hcDxzdHJpbmcsIExvZ2luUHJvdmlkZXI+O1xyXG5cclxuICBwcml2YXRlIF91c2VyOiBTb2NpYWxVc2VyID0gbnVsbDtcclxuICBwcml2YXRlIF9hdXRoU3RhdGU6IFJlcGxheVN1YmplY3Q8U29jaWFsVXNlcj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcclxuICBwcml2YXRlIF9yZWFkeVN0YXRlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGF1dGhTdGF0ZSgpOiBPYnNlcnZhYmxlPFNvY2lhbFVzZXI+IHtcclxuICAgIHJldHVybiB0aGlzLl9hdXRoU3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG4gIC8qKiBQcm92aWRlcyBhbiBhcnJheSBvZiBwcm92aWRlciBJRCdzIGFzIHRoZXkgYmVjb21lIHJlYWR5ICovXHJcbiAgZ2V0IHJlYWR5U3RhdGUoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlYWR5U3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IEF1dGhTZXJ2aWNlQ29uZmlnKSB7XHJcbiAgICB0aGlzLnByb3ZpZGVycyA9IGNvbmZpZy5wcm92aWRlcnM7XHJcblxyXG4gICAgaWYgKCFjb25maWcubGF6eUxvYWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRpYWxpemUoKSB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIHRoaXMucHJvdmlkZXJzLmZvckVhY2goKHByb3ZpZGVyOiBMb2dpblByb3ZpZGVyLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICBwcm92aWRlci5pbml0aWFsaXplKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlYWR5UHJvdmlkZXJzID0gdGhpcy5fcmVhZHlTdGF0ZS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIHJlYWR5UHJvdmlkZXJzLnB1c2goa2V5KTtcclxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlLm5leHQocmVhZHlQcm92aWRlcnMpO1xyXG5cclxuICAgICAgICBwcm92aWRlci5nZXRMb2dpblN0YXR1cygpLnRoZW4oKHVzZXIpID0+IHtcclxuICAgICAgICAgIHVzZXIucHJvdmlkZXIgPSBrZXk7XHJcblxyXG4gICAgICAgICAgdGhpcy5fdXNlciA9IHVzZXI7XHJcbiAgICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dCh1c2VyKTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9hdXRoU3RhdGUubmV4dChudWxsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNpZ25Jbihwcm92aWRlcklkOiBzdHJpbmcsIG9wdD86IExvZ2luT3B0KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgcHJvdmlkZXJPYmplY3QgPSB0aGlzLnByb3ZpZGVycy5nZXQocHJvdmlkZXJJZCk7XHJcbiAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xyXG4gICAgICAgIHByb3ZpZGVyT2JqZWN0LnNpZ25JbihvcHQpLnRoZW4oKHVzZXI6IFNvY2lhbFVzZXIpID0+IHtcclxuICAgICAgICAgIHVzZXIucHJvdmlkZXIgPSBwcm92aWRlcklkO1xyXG4gICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuXHJcbiAgICAgICAgICB0aGlzLl91c2VyID0gdXNlcjtcclxuICAgICAgICAgIHRoaXMuX2F1dGhTdGF0ZS5uZXh0KHVzZXIpO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoQXV0aFNlcnZpY2UuRVJSX0xPR0lOX1BST1ZJREVSX05PVF9GT1VORCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2lnbk91dChyZXZva2U6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLl91c2VyKSB7XHJcbiAgICAgICAgcmVqZWN0KEF1dGhTZXJ2aWNlLkVSUl9OT1RfTE9HR0VEX0lOKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcHJvdmlkZXJJZCA9IHRoaXMuX3VzZXIucHJvdmlkZXI7XHJcbiAgICAgICAgbGV0IHByb3ZpZGVyT2JqZWN0ID0gdGhpcy5wcm92aWRlcnMuZ2V0KHByb3ZpZGVySWQpO1xyXG4gICAgICAgIGlmIChwcm92aWRlck9iamVjdCkge1xyXG4gICAgICAgICAgcHJvdmlkZXJPYmplY3Quc2lnbk91dChyZXZva2UpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl91c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fYXV0aFN0YXRlLm5leHQobnVsbCk7XHJcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChBdXRoU2VydmljZS5FUlJfTE9HSU5fUFJPVklERVJfTk9UX0ZPVU5EKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19