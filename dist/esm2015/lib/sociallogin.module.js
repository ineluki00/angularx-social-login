var SocialLoginModule_1;
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AuthServiceConfig } from './auth.service';
export function configFactory(config) {
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
SocialLoginModule = SocialLoginModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        providers: [
            AuthService
        ]
    })
], SocialLoginModule);
export { SocialLoginModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGluZWx1a2kwMC9hbmd1bGFyeC1zb2NpYWwtbG9naW4vIiwic291cmNlcyI6WyJsaWIvc29jaWFsbG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXlCO0lBQ3JELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFVRCxJQUFhLGlCQUFpQix5QkFBOUIsTUFBYSxpQkFBaUI7SUFFckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUF5QjtRQUNoRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLG1CQUFpQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBRUYsQ0FBQTtBQWZZLGlCQUFpQjtJQVI3QixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1NBQ2I7UUFDRCxTQUFTLEVBQUU7WUFDVCxXQUFXO1NBQ1o7S0FDRixDQUFDO0dBQ1csaUJBQWlCLENBZTdCO1NBZlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBBdXRoU2VydmljZUNvbmZpZyB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGYWN0b3J5KGNvbmZpZzogQXV0aFNlcnZpY2VDb25maWcpIHtcclxuICByZXR1cm4gY29uZmlnO1xyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBdXRoU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNvY2lhbExvZ2luTW9kdWxlIHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKGNvbmZpZzogQXV0aFNlcnZpY2VDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBTb2NpYWxMb2dpbk1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQXV0aFNlcnZpY2UsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogQXV0aFNlcnZpY2VDb25maWcsXHJcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbn1cclxuIl19