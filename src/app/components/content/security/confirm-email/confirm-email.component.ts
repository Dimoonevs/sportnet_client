import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmEmailData } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css',  "../form-auth/form-auth.component.css"]
})
export class ConfirmEmailComponent {
  aSub!: Subscription
  constructor(private service: SecurityService, private router: Router, private toastr: ToastrService){}
  onSubmit(data: ConfirmEmailData){
    data.id = Number(this.service.getId())
    this.aSub = this.service.confirmationEmail(data).subscribe(() => {
      this.router.navigate(['/form/sign-in']);
      this.toastr.success("Email confirmed successfully. Welcome!", "Success confirm email");
    },
    error => {
      this.toastr.error(error.error.message, "Error confirm email")
    });
  }
}
