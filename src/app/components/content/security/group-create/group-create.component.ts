import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubscriptionData } from 'src/app/modules/data';
import { GroupService } from 'src/app/service/group-service';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css',"../form-auth/form-auth.component.css"]
})
export class GroupCreateComponent implements OnInit{
  form!: FormGroup;
  subscriptions!: SubscriptionData[]
  aSub!: Subscription
  any: any
  selectSubscriptionIsOpen = false
  selectedSubscscription = { name: "Select a subscription", id: 0 }

  constructor(private fb: FormBuilder, private serviceSubscription: SubscriptionService, private router: Router, private toastr: ToastrService, private service: GroupService) {
    this._createForm()
  }
  ngOnInit(): void {
    this.subscriptions = this.serviceSubscription.getSubscriptionsData()
    if (this.subscriptions == undefined){
      this.serviceSubscription.getSubscriptions().subscribe(
        (response: any) => {
          this.subscriptions = response.subscriptions
        }
      )
    }
    
  }

  private _createForm(){
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
    })
  }
  get _name() {return this.form.get('name'); }

  onSubmit(){
    let groupSubmit = {
      name: this._name?.value,
      subscripton_id: this.selectedSubscscription.id
    }

    this.service.createGroup(groupSubmit).subscribe(
      (response: any) => {
        this.router.navigate(['/user/group'])
      }
    )
  }

  selectSubscriptionToggle(){
    this.selectSubscriptionIsOpen = !this.selectSubscriptionIsOpen
  }
  selectSubscriptionOption(option: SubscriptionData){
    this.selectedSubscscription = option
    this.selectSubscriptionIsOpen = false
  }
}
