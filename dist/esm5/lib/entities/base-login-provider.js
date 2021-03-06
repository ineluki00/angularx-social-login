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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1sb2dpbi1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpbmVsdWtpMDAvYW5ndWxhcngtc29jaWFsLWxvZ2luLyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL2Jhc2UtbG9naW4tcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QztJQUlJO1FBRlUsZ0JBQVcsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFN0QsQ0FBQztJQUVQLG1DQUFPLEdBQWpCO1FBQUEsaUJBUUM7UUFQRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFnQjtnQkFDeEMsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxFQUFFLENBQUM7aUJBQ2I7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU9ELHNDQUFVLEdBQVYsVUFBVyxFQUFVLEVBQUUsR0FBVyxFQUFFLE1BQVcsRUFBRSxLQUFZLEVBQUUsa0JBQXVCO1FBQXJDLHNCQUFBLEVBQUEsWUFBWTtRQUFFLG1DQUFBLEVBQUEsdUJBQXVCO1FBQ2xGLDJDQUEyQztRQUMzQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDakUsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN2QixRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuQixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN6Qjs7O2NBR0U7WUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpblByb3ZpZGVyIH0gZnJvbSAnLi9sb2dpbi1wcm92aWRlcic7XHJcbmltcG9ydCB7IFNvY2lhbFVzZXIgfSBmcm9tICcuL3VzZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlTG9naW5Qcm92aWRlciBpbXBsZW1lbnRzIExvZ2luUHJvdmlkZXIge1xyXG5cclxuICAgIHByb3RlY3RlZCBfcmVhZHlTdGF0ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25SZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWFkeVN0YXRlLnN1YnNjcmliZSgoaXNSZWFkeTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgYWJzdHJhY3QgZ2V0TG9naW5TdGF0dXMoKTogUHJvbWlzZTxTb2NpYWxVc2VyPjtcclxuICAgIGFic3RyYWN0IHNpZ25JbigpOiBQcm9taXNlPFNvY2lhbFVzZXI+O1xyXG4gICAgYWJzdHJhY3Qgc2lnbk91dChyZXZva2U/OiBib29sZWFuKTogUHJvbWlzZTxhbnk+O1xyXG5cclxuICAgIGxvYWRTY3JpcHQoaWQ6IHN0cmluZywgc3JjOiBzdHJpbmcsIG9ubG9hZDogYW55LCBhc3luYyA9IHRydWUsIGlubmVyX3RleHRfY29udGVudCA9ICcnKTogdm9pZCB7XHJcbiAgICAgICAgLy8gZ2V0IGRvY3VtZW50IGlmIHBsYXRmb3JtIGlzIG9ubHkgYnJvd3NlclxyXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHtcclxuICAgICAgICAgICAgbGV0IHNpZ25JbkpTID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgICAgIHNpZ25JbkpTLmFzeW5jID0gYXN5bmM7XHJcbiAgICAgICAgICAgIHNpZ25JbkpTLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgc2lnbkluSlMub25sb2FkID0gb25sb2FkO1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZiAoaW5uZXJfdGV4dF9jb250ZW50KSAvLyBMaW5rZWRJblxyXG4gICAgICAgICAgICAgICAgc2lnbkluSlMudGV4dCA9IGlubmVyX3RleHRfY29udGVudDtcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzaWduSW5KUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==