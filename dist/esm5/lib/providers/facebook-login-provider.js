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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stbG9naW4tcHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaW5lbHVraTAwL2FuZ3VsYXJ4LXNvY2lhbC1sb2dpbi8iLCJzb3VyY2VzIjpbImxpYi9wcm92aWRlcnMvZmFjZWJvb2stbG9naW4tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUs5QztJQUEyQyxpREFBaUI7SUFJeEQsK0JBQ1ksUUFBZ0IsRUFDaEIsR0FBaUQsRUFDakQsTUFBd0IsRUFDeEIsTUFBMEQsRUFDMUQsT0FBd0I7UUFIeEIsb0JBQUEsRUFBQSxRQUFrQixLQUFLLEVBQUUsc0JBQXNCLEVBQUU7UUFDakQsdUJBQUEsRUFBQSxnQkFBd0I7UUFDeEIsdUJBQUEsRUFBQSxrREFBMEQ7UUFDMUQsd0JBQUEsRUFBQSxnQkFBd0I7UUFMcEMsWUFNSSxpQkFBTyxTQUFHO1FBTEYsY0FBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixTQUFHLEdBQUgsR0FBRyxDQUE4QztRQUNqRCxZQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixZQUFNLEdBQU4sTUFBTSxDQUFvRDtRQUMxRCxhQUFPLEdBQVAsT0FBTyxDQUFpQjs7SUFDdkIsQ0FBQztJQUVkLDBDQUFVLEdBQVY7UUFBQSxpQkFrQkM7UUFqQkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUM3Qyw0QkFBMEIsS0FBSSxDQUFDLE1BQU0sWUFBUyxFQUM5QztnQkFDSSxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNKLEtBQUssRUFBRSxLQUFJLENBQUMsUUFBUTtvQkFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsTUFBTSxFQUFFLElBQUk7b0JB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LENBQUM7NEJBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDOzRCQUV2QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILE1BQU0sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO3FCQUM5RDtnQkFDTCxDQUFDLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUFBLGlCQVFDO1FBUEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFhO29CQUNwQixPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBaEdzQixpQ0FBVyxHQUFXLFVBQVUsQ0FBQztJQWtHNUQsNEJBQUM7Q0FBQSxBQXBHRCxDQUEyQyxpQkFBaUIsR0FvRzNEO1NBcEdZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VMb2dpblByb3ZpZGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvYmFzZS1sb2dpbi1wcm92aWRlcic7XHJcbmltcG9ydCB7IFNvY2lhbFVzZXIgfSBmcm9tICcuLi9lbnRpdGllcy91c2VyJztcclxuaW1wb3J0IHsgTG9naW5PcHQgfSBmcm9tICcuLi9hdXRoLnNlcnZpY2UnO1xyXG5cclxuZGVjbGFyZSBsZXQgRkI6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBGYWNlYm9va0xvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9WSURFUl9JRDogc3RyaW5nID0gJ0ZBQ0VCT09LJztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNsaWVudElkOiBzdHJpbmcsXHJcbiAgICAgICAgcHJpdmF0ZSBvcHQ6IExvZ2luT3B0ID0geyBzY29wZTogJ2VtYWlsLHB1YmxpY19wcm9maWxlJyB9LFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWxlOiBzdHJpbmcgPSAnZW5fVVMnLFxyXG4gICAgICAgIHByaXZhdGUgZmllbGRzOiBzdHJpbmcgPSAnbmFtZSxlbWFpbCxwaWN0dXJlLGZpcnN0X25hbWUsbGFzdF9uYW1lJyxcclxuICAgICAgICBwcml2YXRlIHZlcnNpb246IHN0cmluZyA9ICd2NC4wJ1xyXG4gICAgKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjcmlwdChGYWNlYm9va0xvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgICAgICAgICAgICBgLy9jb25uZWN0LmZhY2Vib29rLm5ldC8ke3RoaXMubG9jYWxlfS9zZGsuanNgLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEZCLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBJZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0xvZ0FwcEV2ZW50czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ZmJtbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRkIuQXBwRXZlbnRzLmxvZ1BhZ2VWaWV3KCk7ICNGSVggZm9yICMxOFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVN0YXRlLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9naW5TdGF0dXMoKTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBGQi5nZXRMb2dpblN0YXR1cygocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhdXRoUmVzcG9uc2UgPSByZXNwb25zZS5hdXRoUmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZCLmFwaShgL21lP2ZpZWxkcz0ke3RoaXMuZmllbGRzfWAsIChmYlVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWQgPSBmYlVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSBmYlVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBmYlVzZXIuZW1haWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnBob3RvVXJsID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgKyBmYlVzZXIuaWQgKyAnL3BpY3R1cmU/dHlwZT1ub3JtYWwnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBmYlVzZXIuZmlyc3RfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubGFzdE5hbWUgPSBmYlVzZXIubGFzdF9uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5hdXRoVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5mYWNlYm9vayA9IGZiVXNlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ05vIHVzZXIgaXMgY3VycmVudGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluKG9wdD86IExvZ2luT3B0KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBGQi5sb2dpbigocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5hdXRoUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF1dGhSZXNwb25zZSA9IHJlc3BvbnNlLmF1dGhSZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRkIuYXBpKGAvbWU/ZmllbGRzPSR7dGhpcy5maWVsZHN9YCwgKGZiVXNlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXNlcjogU29jaWFsVXNlciA9IG5ldyBTb2NpYWxVc2VyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5pZCA9IGZiVXNlci5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubmFtZSA9IGZiVXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IGZiVXNlci5lbWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucGhvdG9VcmwgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJyArIGZiVXNlci5pZCArICcvcGljdHVyZT90eXBlPW5vcm1hbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmZpcnN0TmFtZSA9IGZiVXNlci5maXJzdF9uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IGZiVXNlci5sYXN0X25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmF1dGhUb2tlbiA9IGF1dGhSZXNwb25zZS5hY2Nlc3NUb2tlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmZhY2Vib29rID0gZmJVc2VyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnVXNlciBjYW5jZWxsZWQgbG9naW4gb3IgZGlkIG5vdCBmdWxseSBhdXRob3JpemUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5vcHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaWduT3V0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBGQi5sb2dvdXQoKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==