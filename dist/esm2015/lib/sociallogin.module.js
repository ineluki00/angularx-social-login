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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsbG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsibGliL3NvY2lhbGxvZ2luLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUF5QjtJQUNyRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBVUQsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBRXJCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBeUI7UUFDaEQsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1g7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUVGLENBQUE7QUFmWSxpQkFBaUI7SUFSN0IsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtTQUNiO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsV0FBVztTQUNaO0tBQ0YsQ0FBQztHQUNXLGlCQUFpQixDQWU3QjtTQWZZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSwgQXV0aFNlcnZpY2VDb25maWcgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnRmFjdG9yeShjb25maWc6IEF1dGhTZXJ2aWNlQ29uZmlnKSB7XHJcbiAgcmV0dXJuIGNvbmZpZztcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQXV0aFNlcnZpY2VcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTb2NpYWxMb2dpbk1vZHVsZSB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb25maWc6IEF1dGhTZXJ2aWNlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU29jaWFsTG9naW5Nb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IEF1dGhTZXJ2aWNlQ29uZmlnLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==