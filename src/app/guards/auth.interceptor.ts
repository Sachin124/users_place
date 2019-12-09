import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable
} from 'rxjs';
import {
    Injectable
} from '@angular/core';
import {
    Router,
} from '@angular/router';
import {
    tap
} from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
baseUrl = environment.url;
    constructor(private router: Router, private userService:  UserService, private toaster: ToastrService, private cookieService: CookieService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let cookieValue = this.cookieService.get('currentUser');

        if (request.url != `${this.baseUrl}auth-login` && request.url != `${this.baseUrl}sign-up` && cookieValue != "undefined" && cookieValue !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: JSON.parse(cookieValue).token
                }
            });
        }
        return next.handle(request).pipe(tap((
          ) => { },
              err => {
                  if (err.status === 401) {
                      this.userService.logout();
                      this.router.navigateByUrl('/user/login');
                      this.toaster.error('Session Expired','error');
                  }
              }
          ));
    }
}
