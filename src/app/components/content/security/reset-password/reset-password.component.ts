import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword, ResetPasswordResponde } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css',  "../form-auth/form-auth.component.css"]
})
export class ResetPasswordComponent {
  constructor(private router: Router, private service: SecurityService, private toastr: ToastrService){}
  onSubmit(data: ResetPassword){
    this.service.resetPassword(data).subscribe((response: ResetPasswordResponde) => {
      this.router.navigate(['/reset/password/confirm']);
    },
    error => {
      this.toastr.error(error.error.message, "Error reset password")
    })
  }
}
