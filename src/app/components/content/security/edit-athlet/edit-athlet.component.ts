import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubscriptionData, GroupData, AthleteData } from 'src/app/modules/data';
import { AthletService } from 'src/app/service/athlet-serivece';
import { GroupService } from 'src/app/service/group-service';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-edit-athlet',
  templateUrl: './edit-athlet.component.html',
  styleUrls: ['./edit-athlet.component.css',"../form-auth/form-auth.component.css"]
})
export class EditAthletComponent {
  form!: FormGroup;
  subscriptions!: SubscriptionData[]
  aSub!: Subscription
  any: any
  selectSubscriptionIsOpen = false
  selectGroupIsOpen = false
  selectedSubscscription = { name: "Select a subscription", id: 0, customTimeLimited:0 }
  selectedGroup = { name: "Select a group", id: 0 }
  group!: GroupData
  groups!: GroupData[]
  isSelectedSubscription = false
  athlete!: AthleteData

  constructor(private fb: FormBuilder, private service: AthletService, private serviceSubscription: SubscriptionService, private router: Router, private toastr: ToastrService, private serviceGroup: GroupService) {
    this.group = serviceGroup.getGroupForEdit()
    this.athlete = this.service.getSelectAthlet()
    serviceGroup.getGroups().subscribe(
      (response: any) => {
        this.groups = response.groups
        
        this.selectedGroup = this.groups[this.athlete.groupId- 1]
      }
    )
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

    
    this._createForm(this.athlete)
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

  private _createForm(athlete: AthleteData){
    this.form = this.fb.group({
      firstName: [athlete.firstName, [
        Validators.required,
      ]],
      lastName: [athlete.lastName, [
        Validators.required,
      ]],
      customTimeLimit: [athlete.daysLeft, [
        Validators.required,
      ]],
      dateLast: [athlete.dateLast, [
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
      days_left: Number(this._customTimeLimit?.value),
      group_id: this.selectedGroup.id,
      id: this.athlete.id
    }
    console.log({athletes: [athletSubmit]})
    this.service.editAthletes({athletes: [athletSubmit]}).subscribe(
      (response: any) => {
        location.reload()
      }
    )
  }

  selectSubscriptionToggle(){
    this.selectSubscriptionIsOpen = !this.selectSubscriptionIsOpen
  }
  selectGroupToggle(){
    this.selectGroupIsOpen = !this.selectGroupIsOpen
  }
  selectSubscriptionOption(option: SubscriptionData){
    this.selectedSubscscription = option
    this.selectSubscriptionIsOpen = false
    // this._createForm(this.service.getSelectAthlet())
  }
  selectGroupOption(option: GroupData){
    this.selectedGroup = option
    console.log(option.subscriptionId)
    if (option.subscriptionId == undefined){
      this.isSelectedSubscription = false
    }else{
      for (let i = 0; i < this.subscriptions.length; i++){
        if (this.subscriptions[i].id == option.subscriptionId){
          this.selectedSubscscription = this.subscriptions[i]
          this.isSelectedSubscription = true
        }
      }
    }
    this.selectGroupIsOpen = false
  }
}
