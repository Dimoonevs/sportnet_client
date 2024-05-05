import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GetUserResponse, RegisterResponse, User } from '../modules/data';
import { SecurityService } from './security-service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: GetUserResponse

  constructor(private http: HttpClient, private sercurity: SecurityService, private cookieService: CookieService) { }

  getUser(): Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>("http://localhost:8000/user").pipe(
      tap(
        (response: GetUserResponse) => {
          this.setUser(response)
          return response
        }
      )
    )
  }
  updateUser(data: any): Observable<User> {
    return this.http.put<User>("http://localhost:8000/user", data).pipe(
      tap(
        (response: User) => {
          return response
        }
      )
    )
  }

  changeEmail(data: any): Observable<RegisterResponse> {
    return this.http.put<RegisterResponse>("http://localhost:8000/user/email", data).pipe(
      tap(
        (response: RegisterResponse) => {
          console.log(response)
          this.sercurity.setId(response.data)
          return response
        }
      )
    )
  }

  setUser(user: GetUserResponse) {
    this.user = user
  }

  getUserData(): GetUserResponse {
    return this.user
  }
}
