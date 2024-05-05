import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetUserResponse, ResetPassword, ResetPasswordResponde, User } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-information-user',
  templateUrl: './information-user.component.html',
  styleUrls: ['./information-user.component.css']
})
export class InformationUserComponent implements OnInit {

  isEditing = false;
  newEmail = '';

  user!: GetUserResponse
  constructor(private userService: UserService, private security: SecurityService, private router: Router, private cookies: CookieService) {}
  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user
    })
  }
  resetPassword(){
    let req = {
      id: this.security.getIdFromToken(this.cookies.get('token')),
      email: this.user.data.email,
      password: ""
    }
    this.security.resetPassword(req).subscribe(() => {
      this.router.navigate(['/reset/password/confirm']);
    })
  }
  changeEmail(){
    this.isEditing = true;
  }

  saveEmail() {
    this.userService.changeEmail({email: this.newEmail}).subscribe(() => {
      this.security.logout()
      this.router.navigate(['/confirm/email']).then(() => {
        window.location.reload();
      })

    })
  }
  editProfile(){
    this.router.navigate(['/user/edit'])
  }

}
