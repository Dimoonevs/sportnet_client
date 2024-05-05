import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GroupData, SubscriptionData } from 'src/app/modules/data';
import { AthletService } from 'src/app/service/athlet-serivece';
import { GroupService } from 'src/app/service/group-service';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-athlet-create',
  templateUrl: './athlet-create.component.html',
  styleUrls: ['./athlet-create.component.css',"../form-auth/form-auth.component.css"]
})
export class AthletCreateComponent {
  form!: FormGroup;
  subscriptions!: SubscriptionData[]
  aSub!: Subscription
  any: any
  selectSubscriptionIsOpen = false
  selectedSubscscription = { name: "Select a subscription", id: 0, customTimeLimited:0 }
  group!: GroupData
  isSelectedSubscription = false

  constructor(private fb: FormBuilder, private service: AthletService, private serviceSubscription: SubscriptionService, private router: Router, private toastr: ToastrService, private serviceGroup: GroupService) {
    this.group = serviceGroup.getGroupForEdit()
    this.subscriptions = this.serviceSubscription.getSubscriptionsData()
    if (this.group == undefined){
      this.router.navigate(['/user/group'])
    }
    for (let i = 0; i < this.subscriptions.length; i++){
      if (this.subscriptions[i].id == this.group.subscriptionId){
        this.selectedSubscscription = this.subscriptions[i]
        this.isSelectedSubscription = true
      }
    }
    this._createForm(this.selectedSubscscription.customTimeLimited)
  }
  ngOnInit(): void {
    if (this.subscriptions == undefined){
      this.serviceSubscription.getSubscriptions().subscribe(
        (response: any) => {
          this.subscriptions = response.subscriptions
        }
      )
    }
    
  }

  private _createForm(dayTraining: number){
    this.form = this.fb.group({
      firstName: ['', [
        Validators.required,
      ]],
      lastName: ['', [
        Validators.required,
      ]],
      customTimeLimit: [dayTraining, [
        Validators.required,
      ]],
      dateLast: ['', [
        Validators.required,
      ]]
    })
  }
  get  _firstName() {return this.form.get('firstName'); }
  get  _lastName() {return this.form.get('lastName'); }
  get  _customTimeLimit() {return this.form.get('customTimeLimit'); }
  get  _dateLast() {return this.form.get('dateLast'); }

  onSubmit(){
    let athletSubmit = {
      first_name: this._firstName?.value,
      last_name: this._lastName?.value,
      subscription_id: this.selectedSubscscription.id,
      date_last: this._dateLast?.value,
      days_left: this._customTimeLimit?.value,
      group_id: this.group.id
    }
    this.service.createAthlet(athletSubmit).subscribe(
      (response: any) => {
        this.router.navigate(['/user/group'])
      }
    )
    this._createForm(this.selectedSubscscription.customTimeLimited)
  }

  selectSubscriptionToggle(){
    this.selectSubscriptionIsOpen = !this.selectSubscriptionIsOpen
  }
  selectSubscriptionOption(option: SubscriptionData){
    this.selectedSubscscription = option
    this.selectSubscriptionIsOpen = false
    this._createForm(option.customTimeLimited)
  }
}
