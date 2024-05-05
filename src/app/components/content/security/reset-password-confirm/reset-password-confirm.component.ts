import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword, ResetPasswordResponde } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.css',  "../form-auth/form-auth.component.css"]
})
export class ResetPasswordConfirmComponent {
  hide = true;
  constructor(private router: Router, private service: SecurityService, private toastr: ToastrService){}
  onSubmit(data: ResetPassword){
    data.id = Number(this.service.getId())

    // console.log(data)

    this.service.resetPasswordConfirm(data).subscribe((response: ResetPasswordResponde) => {
      this.router.navigate(['/form/sign-in']);
      this.toastr.success("Password changed successfully. Welcome!", "Success reset password");
    },
    error => {
      this.toastr.error(error.error.message, "Error reset password")
    })
  }
}
