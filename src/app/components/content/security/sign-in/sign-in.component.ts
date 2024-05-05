import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataForm } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css', "../form-auth/form-auth.component.css"]
})

export class SignInComponent {

  aSub!: Subscription
  
  message: string | any
  hide = true;
  constructor(private service: SecurityService, private router: Router, private toastr: ToastrService) {}
  onSubmit(data: DataForm) {
    this.aSub = this.service.login(data).subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    },
      error => {
        let message = error.error.message 
        if (message.includes("not active")){
          let idIndex = message.indexOf('id: ');
          let idValue = message.substring(idIndex + 4);
          this.service.setId(parseInt(idValue))
          this.toastr.error("Account not active. We send code to your email!", "Error sign in", {
            timeOut: 10000
          })
          this.router.navigate(['/confirm/email']);
          return
        }
        this.toastr.error(error.error.message, "Error sign in")
      });
  }
}
