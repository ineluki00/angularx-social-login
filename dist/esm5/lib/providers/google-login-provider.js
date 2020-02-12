import * as tslib_1 from "tslib";
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
var GoogleLoginProvider = /** @class */ (function (_super) {
    tslib_1.__extends(GoogleLoginProvider, _super);
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
                    _this.auth2 = gapi.auth2.init(tslib_1.__assign({}, _this.opt, { client_id: _this.clientId }));
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
export { GoogleLoginProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGluZWx1a2kwMC9hbmd1bGFyeC1zb2NpYWwtbG9naW4vIiwic291cmNlcyI6WyJsaWIvcHJvdmlkZXJzL2dvb2dsZS1sb2dpbi1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSzlDO0lBQXlDLCtDQUFpQjtJQU10RCw2QkFBb0IsUUFBZ0IsRUFBVSxHQUFrQztRQUFsQyxvQkFBQSxFQUFBLFFBQWtCLEtBQUssRUFBRSxPQUFPLEVBQUU7UUFBaEYsWUFBb0YsaUJBQU8sU0FBRztRQUExRSxjQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVUsU0FBRyxHQUFILEdBQUcsQ0FBK0I7O0lBQWEsQ0FBQztJQUU5Rix3Q0FBVSxHQUFWO1FBQUEsaUJBb0JDO1FBbkJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixLQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFDM0Msd0NBQXdDLEVBQ3hDO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNmLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLHNCQUNyQixLQUFJLENBQUMsR0FBRyxJQUNYLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUSxJQUMxQixDQUFDO29CQUVILEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNaLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM1QixPQUFPLEVBQUUsQ0FBQztvQkFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFRO3dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFjLEdBQWQ7UUFBQSxpQkF1QkM7UUF0QkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQzdCLElBQUksSUFBSSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7b0JBQ3hDLGdFQUFnRTtvQkFDaEUsK0VBQStFO29CQUMvRSxrRkFBa0Y7b0JBRWxGLDZCQUE2QjtvQkFDN0IsaUNBQWlDO29CQUNqQyxtQ0FBbUM7b0JBQ25DLHlDQUF5QztvQkFDekMsMkNBQTJDO29CQUMzQywyQ0FBMkM7b0JBQzNDLDBCQUEwQjtvQkFDMUIsK0JBQStCO29CQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2lCQUM3QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQU0sR0FBTixVQUFPLEdBQWM7UUFBckIsaUJBaUNDO1FBaENHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFNLGFBQWEsR0FBWSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BHLElBQUksT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFM0YsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWE7b0JBQ3ZCLElBQUksSUFBSSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7b0JBQ3hDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO3FCQUMxQzt5QkFBTTt3QkFDSCxJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDN0QsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQzt3QkFDNUUsSUFBSSxZQUFZLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQzt3QkFFL0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO3FCQUMvQjtvQkFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsRUFBRSxVQUFDLE1BQVc7b0JBQ1gsTUFBTSxDQUFDLGtEQUFrRCxDQUFDLENBQUM7Z0JBQy9ELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQVE7b0JBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLE1BQWdCO1FBQXhCLGlCQXFCQztRQXBCRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDaEIsSUFBSSxjQUFjLENBQUM7Z0JBQ25CLElBQUksTUFBTSxFQUFFO29CQUNSLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUM1QztxQkFBTTtvQkFDSCxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDekM7Z0JBRUQsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7b0JBQ3pCLElBQUksR0FBRyxFQUFFO3dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDZjt5QkFBTTt3QkFDSCxPQUFPLEVBQUUsQ0FBQztxQkFDYjtnQkFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFRO29CQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTdHc0IsK0JBQVcsR0FBVyxRQUFRLENBQUM7SUE4RzFELDBCQUFDO0NBQUEsQUFoSEQsQ0FBeUMsaUJBQWlCLEdBZ0h6RDtTQWhIWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTG9naW5Qcm92aWRlciB9IGZyb20gJy4uL2VudGl0aWVzL2Jhc2UtbG9naW4tcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBTb2NpYWxVc2VyIH0gZnJvbSAnLi4vZW50aXRpZXMvdXNlcic7XHJcbmltcG9ydCB7IExvZ2luT3B0IH0gZnJvbSAnLi4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbmRlY2xhcmUgbGV0IGdhcGk6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVMb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdHT09HTEUnO1xyXG5cclxuICAgIHByb3RlY3RlZCBhdXRoMjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50SWQ6IHN0cmluZywgcHJpdmF0ZSBvcHQ6IExvZ2luT3B0ID0geyBzY29wZTogJ2VtYWlsJyB9KSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjcmlwdChHb29nbGVMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICAgICAgICAgICAgJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL3BsYXRmb3JtLmpzJyxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnYXBpLmxvYWQoJ2F1dGgyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGgyID0gZ2FwaS5hdXRoMi5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMub3B0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoMi50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5U3RhdGUubmV4dCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMb2dpblN0YXR1cygpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVhZHkoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dGgyLmlzU2lnbmVkSW4uZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHByb2ZpbGUgPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEJhc2ljUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0b2tlbiA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QXV0aFJlc3BvbnNlKHRydWUpLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgYmFja2VuZFRva2VuID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRBdXRoUmVzcG9uc2UodHJ1ZSkuaWRfdG9rZW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIuaWQgPSBwcm9maWxlLmdldElkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5uYW1lID0gcHJvZmlsZS5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5lbWFpbCA9IHByb2ZpbGUuZ2V0RW1haWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLnBob3RvVXJsID0gcHJvZmlsZS5nZXRJbWFnZVVybCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIuZmlyc3ROYW1lID0gcHJvZmlsZS5nZXRHaXZlbk5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLmxhc3ROYW1lID0gcHJvZmlsZS5nZXRGYW1pbHlOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5hdXRoVG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLmlkVG9rZW4gPSBiYWNrZW5kVG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4uJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25JbihvcHQ/OiBMb2dpbk9wdCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2ZmbGluZUFjY2VzczogYm9vbGVhbiA9IChvcHQgJiYgb3B0Lm9mZmxpbmVfYWNjZXNzKSB8fCAodGhpcy5vcHQgJiYgdGhpcy5vcHQub2ZmbGluZV9hY2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSAhb2ZmbGluZUFjY2VzcyA/IHRoaXMuYXV0aDIuc2lnbkluKG9wdCkgOiB0aGlzLmF1dGgyLmdyYW50T2ZmbGluZUFjY2VzcyhvcHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmF1dGhvcml6YXRpb25Db2RlID0gcmVzcG9uc2UuY29kZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvZmlsZSA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QmFzaWNQcm9maWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QXV0aFJlc3BvbnNlKHRydWUpLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhY2tlbmRUb2tlbiA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QXV0aFJlc3BvbnNlKHRydWUpLmlkX3Rva2VuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5pZCA9IHByb2ZpbGUuZ2V0SWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5uYW1lID0gcHJvZmlsZS5nZXROYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBwcm9maWxlLmdldEVtYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucGhvdG9VcmwgPSBwcm9maWxlLmdldEltYWdlVXJsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gcHJvZmlsZS5nZXRHaXZlbk5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IHByb2ZpbGUuZ2V0RmFtaWx5TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmF1dGhUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmlkVG9rZW4gPSBiYWNrZW5kVG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgKGNsb3NlZDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdVc2VyIGNhbmNlbGxlZCBsb2dpbiBvciBkaWQgbm90IGZ1bGx5IGF1dGhvcml6ZS4nKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25PdXQocmV2b2tlPzogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lnbk91dFByb21pc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV2b2tlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbk91dFByb21pc2UgPSB0aGlzLmF1dGgyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbk91dFByb21pc2UgPSB0aGlzLmF1dGgyLnNpZ25PdXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzaWduT3V0UHJvbWlzZS50aGVuKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==