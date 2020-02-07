import { BehaviorSubject } from 'rxjs';
var BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
        this._readyState = new BehaviorSubject(false);
    }
    BaseLoginProvider.prototype.onReady = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._readyState.subscribe(function (isReady) {
                if (isReady) {
                    resolve();
                }
            });
        });
    };
    BaseLoginProvider.prototype.loadScript = function (id, src, onload, async, inner_text_content) {
        if (async === void 0) { async = true; }
        if (inner_text_content === void 0) { inner_text_content = ''; }
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
            var signInJS = document.createElement('script');
            signInJS.async = async;
            signInJS.src = src;
            signInJS.onload = onload;
            /*
            if (inner_text_content) // LinkedIn
                signInJS.text = inner_text_content;
            */
            document.head.appendChild(signInJS);
        }
    };
    return BaseLoginProvider;
}());
export { BaseLoginProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1sb2dpbi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ4LXNvY2lhbC1sb2dpbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdGllcy9iYXNlLWxvZ2luLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkM7SUFJSTtRQUZVLGdCQUFXLEdBQTZCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTdELENBQUM7SUFFUCxtQ0FBTyxHQUFqQjtRQUFBLGlCQVFDO1FBUEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBZ0I7Z0JBQ3hDLElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sRUFBRSxDQUFDO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFPRCxzQ0FBVSxHQUFWLFVBQVcsRUFBVSxFQUFFLEdBQVcsRUFBRSxNQUFXLEVBQUUsS0FBWSxFQUFFLGtCQUF1QjtRQUFyQyxzQkFBQSxFQUFBLFlBQVk7UUFBRSxtQ0FBQSxFQUFBLHVCQUF1QjtRQUNsRiwyQ0FBMkM7UUFDM0MsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2pFLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdkIsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkIsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDekI7OztjQUdFO1lBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naW5Qcm92aWRlciB9IGZyb20gJy4vbG9naW4tcHJvdmlkZXInO1xyXG5pbXBvcnQgeyBTb2NpYWxVc2VyIH0gZnJvbSAnLi91c2VyJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUxvZ2luUHJvdmlkZXIgaW1wbGVtZW50cyBMb2dpblByb3ZpZGVyIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3JlYWR5U3RhdGU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uUmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZS5zdWJzY3JpYmUoKGlzUmVhZHk6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1JlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGFic3RyYWN0IGdldExvZ2luU3RhdHVzKCk6IFByb21pc2U8U29jaWFsVXNlcj47XHJcbiAgICBhYnN0cmFjdCBzaWduSW4oKTogUHJvbWlzZTxTb2NpYWxVc2VyPjtcclxuICAgIGFic3RyYWN0IHNpZ25PdXQocmV2b2tlPzogYm9vbGVhbik6IFByb21pc2U8YW55PjtcclxuXHJcbiAgICBsb2FkU2NyaXB0KGlkOiBzdHJpbmcsIHNyYzogc3RyaW5nLCBvbmxvYWQ6IGFueSwgYXN5bmMgPSB0cnVlLCBpbm5lcl90ZXh0X2NvbnRlbnQgPSAnJyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGdldCBkb2N1bWVudCBpZiBwbGF0Zm9ybSBpcyBvbmx5IGJyb3dzZXJcclxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7XHJcbiAgICAgICAgICAgIGxldCBzaWduSW5KUyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICBzaWduSW5KUy5hc3luYyA9IGFzeW5jO1xyXG4gICAgICAgICAgICBzaWduSW5KUy5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIHNpZ25JbkpTLm9ubG9hZCA9IG9ubG9hZDtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgKGlubmVyX3RleHRfY29udGVudCkgLy8gTGlua2VkSW5cclxuICAgICAgICAgICAgICAgIHNpZ25JbkpTLnRleHQgPSBpbm5lcl90ZXh0X2NvbnRlbnQ7XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2lnbkluSlMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=