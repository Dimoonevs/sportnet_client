import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private cookieService: CookieService,
        private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        if (this.cookieService.check('token')) {
            return of(true);
        } else {
            this.router.navigate(['form/sign-in'])
            return of(false);
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{ return this.canActivate(route, state)}

}