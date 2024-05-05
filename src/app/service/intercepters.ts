import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from './security-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookies: CookieService, private router: Router, private service: SecurityService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.cookies.get('token');

    if (req.url.includes('user')|| req.url.includes('sub') || req.url.includes('group') || req.url.includes('athlete')) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });

        return next.handle(authReq).pipe(
            catchError(
                (error:HttpErrorResponse) => {
                    return this.handleAuthError(error)
            })
        );
    }

    return next.handle(req);
  }
  private handleAuthError(error: HttpErrorResponse): Observable<any>{
    if (error.status === 401){
        this.router.navigate(['/form/sign-in']).then(() => {
            window.location.reload();
        });
        this.service.logout()
    }
    return throwError(error);
}
}
