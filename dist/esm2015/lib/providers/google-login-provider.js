import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class GoogleLoginProvider extends BaseLoginProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWxvZ2luLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsibGliL3Byb3ZpZGVycy9nb29nbGUtbG9naW4tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSzlDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxpQkFBaUI7SUFNdEQsWUFBb0IsUUFBZ0IsRUFBVSxNQUFnQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7UUFBSSxLQUFLLEVBQUUsQ0FBQztRQUF4RSxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBK0I7SUFBYSxDQUFDO0lBRTlGLFVBQVU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUMzQyx3Q0FBd0MsRUFDeEMsR0FBRyxFQUFFO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksbUJBQ3JCLElBQUksQ0FBQyxHQUFHLElBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQzFCLENBQUM7b0JBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDNUIsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7d0JBQ2xC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LENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBN0dzQiwrQkFBVyxHQUFXLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VMb2dpblByb3ZpZGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvYmFzZS1sb2dpbi1wcm92aWRlcic7XHJcbmltcG9ydCB7IFNvY2lhbFVzZXIgfSBmcm9tICcuLi9lbnRpdGllcy91c2VyJztcclxuaW1wb3J0IHsgTG9naW5PcHQgfSBmcm9tICcuLi9hdXRoLnNlcnZpY2UnO1xyXG5cclxuZGVjbGFyZSBsZXQgZ2FwaTogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEdvb2dsZUxvZ2luUHJvdmlkZXIgZXh0ZW5kcyBCYXNlTG9naW5Qcm92aWRlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9WSURFUl9JRDogc3RyaW5nID0gJ0dPT0dMRSc7XHJcblxyXG4gICAgcHJvdGVjdGVkIGF1dGgyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRJZDogc3RyaW5nLCBwcml2YXRlIG9wdDogTG9naW5PcHQgPSB7IHNjb3BlOiAnZW1haWwnIH0pIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NyaXB0KEdvb2dsZUxvZ2luUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvcGxhdGZvcm0uanMnLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhcGkubG9hZCgnYXV0aDInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aDIgPSBnYXBpLmF1dGgyLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5vcHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGgyLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZS5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0aDIuaXNTaWduZWRJbi5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyOiBTb2NpYWxVc2VyID0gbmV3IFNvY2lhbFVzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcHJvZmlsZSA9IHRoaXMuYXV0aDIuY3VycmVudFVzZXIuZ2V0KCkuZ2V0QmFzaWNQcm9maWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHRva2VuID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRBdXRoUmVzcG9uc2UodHJ1ZSkuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBiYWNrZW5kVG9rZW4gPSB0aGlzLmF1dGgyLmN1cnJlbnRVc2VyLmdldCgpLmdldEF1dGhSZXNwb25zZSh0cnVlKS5pZF90b2tlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5pZCA9IHByb2ZpbGUuZ2V0SWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLm5hbWUgPSBwcm9maWxlLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLmVtYWlsID0gcHJvZmlsZS5nZXRFbWFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIucGhvdG9VcmwgPSBwcm9maWxlLmdldEltYWdlVXJsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlci5maXJzdE5hbWUgPSBwcm9maWxlLmdldEdpdmVuTmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIubGFzdE5hbWUgPSBwcm9maWxlLmdldEZhbWlseU5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyLmF1dGhUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXIuaWRUb2tlbiA9IGJhY2tlbmRUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ05vIHVzZXIgaXMgY3VycmVudGx5IGxvZ2dlZCBpbi4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluKG9wdD86IExvZ2luT3B0KTogUHJvbWlzZTxTb2NpYWxVc2VyPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZsaW5lQWNjZXNzOiBib29sZWFuID0gKG9wdCAmJiBvcHQub2ZmbGluZV9hY2Nlc3MpIHx8ICh0aGlzLm9wdCAmJiB0aGlzLm9wdC5vZmZsaW5lX2FjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9ICFvZmZsaW5lQWNjZXNzID8gdGhpcy5hdXRoMi5zaWduSW4ob3B0KSA6IHRoaXMuYXV0aDIuZ3JhbnRPZmZsaW5lQWNjZXNzKG9wdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXI6IFNvY2lhbFVzZXIgPSBuZXcgU29jaWFsVXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYXV0aG9yaXphdGlvbkNvZGUgPSByZXNwb25zZS5jb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9maWxlID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRCYXNpY1Byb2ZpbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRBdXRoUmVzcG9uc2UodHJ1ZSkuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFja2VuZFRva2VuID0gdGhpcy5hdXRoMi5jdXJyZW50VXNlci5nZXQoKS5nZXRBdXRoUmVzcG9uc2UodHJ1ZSkuaWRfdG9rZW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmlkID0gcHJvZmlsZS5nZXRJZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm5hbWUgPSBwcm9maWxlLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5lbWFpbCA9IHByb2ZpbGUuZ2V0RW1haWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5waG90b1VybCA9IHByb2ZpbGUuZ2V0SW1hZ2VVcmwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBwcm9maWxlLmdldEdpdmVuTmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmxhc3ROYW1lID0gcHJvZmlsZS5nZXRGYW1pbHlOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuYXV0aFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuaWRUb2tlbiA9IGJhY2tlbmRUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICB9LCAoY2xvc2VkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1VzZXIgY2FuY2VsbGVkIGxvZ2luIG9yIGRpZCBub3QgZnVsbHkgYXV0aG9yaXplLicpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbk91dChyZXZva2U/OiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUmVhZHkoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzaWduT3V0UHJvbWlzZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXZva2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaWduT3V0UHJvbWlzZSA9IHRoaXMuYXV0aDIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzaWduT3V0UHJvbWlzZSA9IHRoaXMuYXV0aDIuc2lnbk91dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNpZ25PdXRQcm9taXNlLnRoZW4oKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19