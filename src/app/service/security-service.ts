import { Injectable } from "@angular/core";
import { ConfirmEmailData, DataForm, LoginResponse, RegisterData, RegisterResponse, ResetPassword, ResetPasswordResponde } from "../modules/data";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class SecurityService {
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private toastr: ToastrService) { }

    requestPayload: any

    login(data: DataForm):Observable<LoginResponse> {
        if (data.usernameOrEmail.includes('@')) {
            this.requestPayload = {
                email: data.usernameOrEmail,
                password: data.password
            }
        }else {
            this.requestPayload = {
                username: data.usernameOrEmail,
                password: data.password
            }
        }
        return this.http.post<LoginResponse>("http://localhost:8000/login", this.requestPayload).pipe(
            tap(
                (response: LoginResponse) => {
                    let expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 100); 

                    this.cookieService.set('token', response.data.token, expiryDate, "/")
                }
            )
        );
        
    }
    registration(data: RegisterData):Observable<RegisterResponse> {
        
        return this.http.post<RegisterResponse>("http://localhost:8000/registrtion", data).pipe(
            tap(
                (response: RegisterResponse) => {
                    this.setId(response.data)
                }
            )
        );
    }
    confirmationEmail(data: ConfirmEmailData): Observable<string> {
        return this.http.post<string>("http://localhost:8000/confirm/email", data).pipe(
            tap(
                (response: string) => {
                    console.log(response)
                }
            )
        )
    }

    resetPassword(data: ResetPassword): Observable<ResetPasswordResponde> {
        return this.http.post<ResetPasswordResponde>("http://localhost:8000/reset/password", data).pipe(
            tap(
                (response: ResetPasswordResponde) => {
                    this.setId(response.id)
                }
            )
        )
    }
    resetPasswordConfirm(data: ResetPassword): Observable<ResetPasswordResponde> {
        return this.http.post<ResetPasswordResponde>("http://localhost:8000/reset/password/confirm", data).pipe(
            tap(
                (response: ResetPasswordResponde) => {
                    this.setId(response.id)
                }
            )
        )
    }

    logout() {
        // localStorage.removeItem('auth-id')
        localStorage.removeItem('auth-username')
        this.cookieService.delete('token', '/')
    }
    setUsername(username: string) {
        localStorage.setItem('auth-username', username)
    }
    getUsername(): string | null {
        return localStorage.getItem('auth-username')
    }
    setId(id: number) {
        localStorage.setItem('auth-id', id.toString())
    }
    getId(): string | null {
        return localStorage.getItem('auth-id')
    }
    getIdFromToken(token: string): number {
        const helper = new JwtHelperService();
        return Number(helper.decodeToken(token).Id)
    }
    getUsernameFromToken(token: string): string {
        const helper = new JwtHelperService();
        return helper.decodeToken(token).Usrname
    }
    isAuthenticated(): boolean {
        if (this.cookieService.check('token')) {
            return true
        }
        return false
    }
    
}