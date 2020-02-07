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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsibGliL3Byb3ZpZGVycy9nb29nbGUtbG9naW4tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUs5QztJQUF5QywrQ0FBaUI7SUFNdEQsNkJBQW9CLFFBQWdCLEVBQVUsR0FBa0M7UUFBbEMsb0JBQUEsRUFBQSxRQUFrQixLQUFLLEVBQUUsT0FBTyxFQUFFO1FBQWhGLFlBQW9GLGlCQUFPLFNBQUc7UUFBMUUsY0FBUSxHQUFSLFFBQVEsQ0FBUTtRQUFVLFNBQUcsR0FBSCxHQUFHLENBQStCOztJQUFhLENBQUM7SUFFOUYsd0NBQVUsR0FBVjtRQUFBLGlCQW9CQztRQW5CRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQzNDLHdDQUF3QyxFQUN4QztnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDZixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxzQkFDckIsS0FBSSxDQUFDLEdBQUcsSUFDWCxTQUFTLEVBQUUsS0FBSSxDQUFDLFFBQVEsSUFDMUIsQ0FBQztvQkFFSCxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDWixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBUTt3QkFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7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LEFBaEhELENBQXlDLGlCQUFpQixHQWdIekQ7U0FoSFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUxvZ2luUHJvdmlkZXIgfSBmcm9tICcuLi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyJztcclxuaW1wb3J0IHsgU29jaWFsVXNlciB9IGZyb20gJy4uL2VudGl0aWVzL3VzZXInO1xyXG5pbXBvcnQgeyBMb2dpbk9wdCB9IGZyb20gJy4uL2F1dGguc2VydmljZSc7XHJcblxyXG5kZWNsYXJlIGxldCBnYXBpOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZ2xlTG9naW5Qcm92aWRlciBleHRlbmRzIEJhc2VMb2dpblByb3ZpZGVyIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBST1ZJREVSX0lEOiBzdHJpbmcgPSAnR09PR0xFJztcclxuXHJcbiAgICBwcm90ZWN0ZWQgYXV0aDI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudElkOiBzdHJpbmcsIHByaXZhdGUgb3B0OiBMb2dpbk9wdCA9IHsgc2NvcGU6ICdlbWFpbCcgfSkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY3JpcHQoR29vZ2xlTG9naW5Qcm92aWRlci5QUk9WSURFUl9JRCxcclxuICAgICAgICAgICAgICAgICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9wbGF0Zm9ybS5qcycsXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FwaS5sb2FkKCdhdXRoMicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoMiA9IGdhcGkuYXV0aDIuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLm9wdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aDIudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVN0YXRlLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9naW5TdGF0dXMoKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRoMi5pc1NpZ25lZEluLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBwcm9maWxlID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRCYXNpY1Byb2ZpbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKS5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGJhY2tlbmRUb2tlbiA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QXV0aFJlc3BvbnNlKHRydWUpLmlkX3Rva2VuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLmlkID0gcHJvZmlsZS5nZXRJZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIubmFtZSA9IHByb2ZpbGUuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIuZW1haWwgPSBwcm9maWxlLmdldEVtYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5waG90b1VybCA9IHByb2ZpbGUuZ2V0SW1hZ2VVcmwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLmZpcnN0TmFtZSA9IHByb2ZpbGUuZ2V0R2l2ZW5OYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5sYXN0TmFtZSA9IHByb2ZpbGUuZ2V0RmFtaWx5TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIuYXV0aFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5pZFRva2VuID0gYmFja2VuZFRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnTm8gdXNlciBpcyBjdXJyZW50bHkgbG9nZ2VkIGluLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaWduSW4ob3B0PzogTG9naW5PcHQpOiBQcm9taXNlPFNvY2lhbFVzZXI+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVhZHkoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9mZmxpbmVBY2Nlc3M6IGJvb2xlYW4gPSAob3B0ICYmIG9wdC5vZmZsaW5lX2FjY2VzcykgfHwgKHRoaXMub3B0ICYmIHRoaXMub3B0Lm9mZmxpbmVfYWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gIW9mZmxpbmVBY2Nlc3MgPyB0aGlzLmF1dGgyLnNpZ25JbihvcHQpIDogdGhpcy5hdXRoMi5ncmFudE9mZmxpbmVBY2Nlc3Mob3B0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hdXRob3JpemF0aW9uQ29kZSA9IHJlc3BvbnNlLmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2ZpbGUgPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEJhc2ljUHJvZmlsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKS5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYWNrZW5kVG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKS5pZF90b2tlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWQgPSBwcm9maWxlLmdldElkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IHByb2ZpbGUuZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gcHJvZmlsZS5nZXRFbWFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnBob3RvVXJsID0gcHJvZmlsZS5nZXRJbWFnZVVybCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IHByb2ZpbGUuZ2V0R2l2ZW5OYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBwcm9maWxlLmdldEZhbWlseU5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5pZFRva2VuID0gYmFja2VuZFRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgIH0sIChjbG9zZWQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaWduT3V0KHJldm9rZT86IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25PdXRQcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldm9rZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25PdXRQcm9taXNlID0gdGhpcy5hdXRoMi5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25PdXRQcm9taXNlID0gdGhpcy5hdXRoMi5zaWduT3V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2lnbk91dFByb21pc2UudGhlbigoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=