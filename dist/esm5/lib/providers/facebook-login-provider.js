import * as tslib_1 from "tslib";
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
var FacebookLoginProvider = /** @class */ (function (_super) {
    tslib_1.__extends(FacebookLoginProvider, _super);
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
export { FacebookLoginProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyeC1zb2NpYWwtbG9naW4vIiwic291cmNlcyI6WyJsaWIvcHJvdmlkZXJzL2ZhY2Vib29rLWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFLOUM7SUFBMkMsaURBQWlCO0lBSXhELCtCQUNZLFFBQWdCLEVBQ2hCLEdBQWlELEVBQ2pELE1BQXdCLEVBQ3hCLE1BQTBELEVBQzFELE9BQXdCO1FBSHhCLG9CQUFBLEVBQUEsUUFBa0IsS0FBSyxFQUFFLHNCQUFzQixFQUFFO1FBQ2pELHVCQUFBLEVBQUEsZ0JBQXdCO1FBQ3hCLHVCQUFBLEVBQUEsa0RBQTBEO1FBQzFELHdCQUFBLEVBQUEsZ0JBQXdCO1FBTHBDLFlBTUksaUJBQU8sU0FBRztRQUxGLGNBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsU0FBRyxHQUFILEdBQUcsQ0FBOEM7UUFDakQsWUFBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsWUFBTSxHQUFOLE1BQU0sQ0FBb0Q7UUFDMUQsYUFBTyxHQUFQLE9BQU8sQ0FBaUI7O0lBQ3ZCLENBQUM7SUFFZCwwQ0FBVSxHQUFWO1FBQUEsaUJBa0JDO1FBakJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixLQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFDN0MsNEJBQTBCLEtBQUksQ0FBQyxNQUFNLFlBQVMsRUFDOUM7Z0JBQ0ksRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDSixLQUFLLEVBQUUsS0FBSSxDQUFDLFFBQVE7b0JBQ3BCLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLE1BQU0sRUFBRSxJQUFJO29CQUNaLEtBQUssRUFB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QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQzs0QkFFdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQztxQkFDTjt5QkFBTTt3QkFDSCxNQUFNLENBQUMsa0RBQWtELENBQUMsQ0FBQztxQkFDOUQ7Z0JBQ0wsQ0FBQyxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFBQSxpQkFRQztRQVBHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUNoQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBYTtvQkFDcEIsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhHc0IsaUNBQVcsR0FBVyxVQUFVLENBQUM7SUFrRzVELDRCQUFDO0NBQUEsQUFwR0QsQ0FBMkMsaUJBQWlCLEdBb0czRDtTQXBHWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTG9naW5Qcm92aWRlciB9IGZyb20gJy4uL2VudGl0aWVzL2Jhc2UtbG9naW4tcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBTb2NpYWxVc2VyIH0gZnJvbSAnLi4vZW50aXRpZXMvdXNlcic7XHJcbmltcG9ydCB7IExvZ2luT3B0IH0gZnJvbSAnLi4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbmRlY2xhcmUgbGV0IEZCOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjZWJvb2tMb2dpblByb3ZpZGVyIGV4dGVuZHMgQmFzZUxvZ2luUHJvdmlkZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUFJPVklERVJfSUQ6IHN0cmluZyA9ICdGQUNFQk9PSyc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLFxyXG4gICAgICAgIHByaXZhdGUgb3B0OiBMb2dpbk9wdCA9IHsgc2NvcGU6ICdlbWFpbCxwdWJsaWNfcHJvZmlsZScgfSxcclxuICAgICAgICBwcml2YXRlIGxvY2FsZTogc3RyaW5nID0gJ2VuX1VTJyxcclxuICAgICAgICBwcml2YXRlIGZpZWxkczogc3RyaW5nID0gJ25hbWUsZW1haWwscGljdHVyZSxmaXJzdF9uYW1lLGxhc3RfbmFtZScsXHJcbiAgICAgICAgcHJpdmF0ZSB2ZXJzaW9uOiBzdHJpbmcgPSAndjQuMCdcclxuICAgICkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY3JpcHQoRmFjZWJvb2tMb2dpblByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICAgICAgICAgICAgYC8vY29ubmVjdC5mYWNlYm9vay5uZXQvJHt0aGlzLmxvY2FsZX0vc2RrLmpzYCxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBGQi5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwSWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2dBcHBFdmVudHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGZibWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZCLkFwcEV2ZW50cy5sb2dQYWdlVmlldygpOyAjRklYIGZvciAjMThcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZS5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXV0aFJlc3BvbnNlID0gcmVzcG9uc2UuYXV0aFJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGQi5hcGkoYC9tZT9maWVsZHM9JHt0aGlzLmZpZWxkc31gLCAoZmJVc2VyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmlkID0gZmJVc2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5uYW1lID0gZmJVc2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gZmJVc2VyLmVtYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5waG90b1VybCA9ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nICsgZmJVc2VyLmlkICsgJy9waWN0dXJlP3R5cGU9bm9ybWFsJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZmlyc3ROYW1lID0gZmJVc2VyLmZpcnN0X25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmxhc3ROYW1lID0gZmJVc2VyLmxhc3RfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZmFjZWJvb2sgPSBmYlVzZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdObyB1c2VyIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25JbihvcHQ/OiBMb2dpbk9wdCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRkIubG9naW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuYXV0aFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdXRoUmVzcG9uc2UgPSByZXNwb25zZS5hdXRoUmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZCLmFwaShgL21lP2ZpZWxkcz0ke3RoaXMuZmllbGRzfWAsIChmYlVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWQgPSBmYlVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBmYlVzZXIuZW1haWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnBob3RvVXJsID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgKyBmYlVzZXIuaWQgKyAnL3BpY3R1cmU/dHlwZT1ub3JtYWwnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBmYlVzZXIuZmlyc3RfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBmYlVzZXIubGFzdF9uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5mYWNlYm9vayA9IGZiVXNlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1VzZXIgY2FuY2VsbGVkIGxvZ2luIG9yIGRpZCBub3QgZnVsbHkgYXV0aG9yaXplLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHRoaXMub3B0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbk91dCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRkIubG9nb3V0KChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=