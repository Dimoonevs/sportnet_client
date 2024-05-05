import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterData, RegisterResponse } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css',"../form-auth/form-auth.component.css"]
})
export class SignUpComponent {
  hide = true;
  hideConform = true;
  form!: FormGroup;
  registerData!: RegisterData;
  aSub!: Subscription
  constructor(private fb: FormBuilder, private service: SecurityService, private router: Router, private toastr: ToastrService) {
    this._createForm();
  }


  private _createForm(){
    this.form = this.fb.group({
      firstName: ['', [
        Validators.required,
      ]],
      lastName: ['', [
        Validators.required,
      ]],
      email:['',[
        Validators.required,
        Validators.email
      ]],
      username: ['', [
        Validators.required,
      ]],
      password: [
        '',
        [ Validators.required,
        ]
      ],
      dateOfBirth: ['', [
        Validators.required,
      ]],
    });
    this.form.addControl('confirmPassword', new FormControl('', [Validators.required, this.passwordConfirming.bind(this)]));
  }

  get  _username() {return this.form.get('username'); }
  get  _password() {return this.form.get('password'); }
  get  _confirmPassword() {return this.form.get('confirmPassword'); }
  get  _email() {return this.form.get('email'); }
  get  _firstName() {return this.form.get('firstName'); }
  get  _lastName() {return this.form.get('lastName'); }
  get  _dateOfBirth() {return this.form.get('dateOfBirth'); }


  passwordConfirming(control: FormControl): { [key: string]: boolean } | null {
    if (control.value !== this._password?.value) {
      return { 'match': true };
    }
    return null;
  }

  async onSubmit() {
    if(this.form.valid){
      this.registerData = {
        username: this._username?.value,
        email: this._email?.value,
        password: this._password?.value,
        first_name: this._firstName?.value,
        last_name: this._lastName?.value,
        date_of_birth: this._dateOfBirth?.value,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    this.aSub = this.service.registration(this.registerData).subscribe(() => {
        this.toastr.success("Sign up successfully. We send secret code to your email", "Success sign up");
        this.router.navigate(['/confirm/email']);
    },
      error => {
        console.log("Error: ", error)
        let message = error.error.message
        if (error.error.message.includes('But none active')) {
          let emailIndex = message.indexOf('email ');
          let emailValue = message.substring(emailIndex + 6, message.indexOf(' already'));
          
          let idIndex = message.indexOf('id: ');
          let idValue = message.substring(idIndex + 4, message.indexOf('.', idIndex));
          this.toastr.info(`User with email ${emailValue} already exists. But none active, we send secret code to ${emailValue}`, "User already exists", {
            timeOut: 10000
          })
          this.service.setId(parseInt(idValue))
          this.router.navigate(['/confirm/email']);
          return
        }
        this.toastr.error(message, "Error sign up")
      });
  }
}
