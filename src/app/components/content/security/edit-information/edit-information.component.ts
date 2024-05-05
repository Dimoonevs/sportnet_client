import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetUserResponse, User, UserUpdateRequest } from 'src/app/modules/data';
import { SecurityService } from 'src/app/service/security-service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.css',"../form-auth/form-auth.component.css"]
})
export class EditInformationComponent implements OnInit {
  form!: FormGroup;
  user!: GetUserResponse
  req!: UserUpdateRequest

  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private toastr: ToastrService, private securityService: SecurityService) {
    this.user = service.getUserData()
    this._createForm();
  }
  ngOnInit(): void {
  }
  private _createForm(){
    if (this.user == undefined){
      this.router.navigate(['/user/info']).then(() => {
        window.location.reload();
      });
    }
    this.form = this.fb.group({
      firstName: [this.user.data.firstName, [
        Validators.required,
      ]],
      lastName: [this.user.data.lastName, [
        Validators.required,
      ]],
      username: [this.user.data.username, [
        Validators.required,
      ]],
      dateOfBirth: [this.user.data.dateOfBirth],
    });
  }

  get  _username() {return this.form.get('username'); }
  get  _firstName() {return this.form.get('firstName'); }
  get  _lastName() {return this.form.get('lastName'); }
  get  _dateOfBirth() {return this.form.get('dateOfBirth'); }

  onSubmit() {
    if(this.form.valid) {
      this.req = {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        username: this.form.value.username,
        date_of_birth: this.form.value.dateOfBirth
      }
      this.service.updateUser(this.req).subscribe(() => {
        this.securityService.logout()
        this.router.navigate(['/confirm/email']).then(() => {
          window.location.reload();
        })
      }, (error) => {
        this.toastr.error(error.error.message);
      })
    }
  }
}
