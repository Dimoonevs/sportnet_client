import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubscriptionData } from 'src/app/modules/data';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css',"../form-auth/form-auth.component.css"]
})
export class EditSubscriptionComponent{
  form!: FormGroup;
  idScheduler!: number
  idCron!: number
  idSubscription!: number
  optionsType = [
    {value: 0 , text:'Fixed number of days', lable:"FIXED_COUNT"},
    {value: 1 ,text:'For a specific period', lable:"DATE_LIMITED"}
  ]
  optionsPerion = [
    {value: 0 ,lable:'Week'},
    {value: 1 ,lable:'Month'},
    {value: 2 ,lable:'Year'},
  ] 
  daysOfWeek!: string[]
  isAutomatly = false
  selectTypeIsOpen = false
  selectPeriodIsOpen = false
  selectedTypeOptionValue = {value: -1 , text:"Select Type" , lable:"NONE"}
  selectedPeriodOptionValue = {value: -1, lable:"Select Period"}
  aSub!: Subscription

  constructor(private fb: FormBuilder, private service: SubscriptionService, private router: Router, private toastr: ToastrService) {
    const sub = service.getSubscriptionData()
    this.isAutomatly = sub.automaticallyManagement
    if (sub.typeSub == "FIXED_COUNT"){
      this.selectedTypeOptionValue = this.optionsType[0]
    }else{
      this.selectedTypeOptionValue = this.optionsType[1]
    }
    this.daysOfWeek = sub.daysOfWeek
    if (sub.timeLimited == "WEEK"){
      this.selectedPeriodOptionValue = this.optionsPerion[0]
    }else if (sub.timeLimited == "MONTH"){
      this.selectedPeriodOptionValue = this.optionsPerion[1]
    }else{
      this.selectedPeriodOptionValue = this.optionsPerion[2]
    }
    this.idScheduler = sub.idScheduler
    this.idCron = sub.cronId
    this.idSubscription = sub.id
    this._createForm(sub)
  }

  private _createForm(subscription: SubscriptionData){
    this.form = this.fb.group({
      name: [subscription.name, [
        Validators.required,
      ]],
      time: [subscription && subscription.time ? subscription.time[0] + ":"+subscription.time[1]: 0, [
        Validators.required,
      ]],
      description: [subscription.description, [
        Validators.required,
      ]],
      customTimeLimit: [subscription.customTimeLimited, [
        Validators.required,
      ]],
      price: [subscription.price, [
        Validators.required,
      ]],
      currency: [subscription.currency, [
        Validators.required,
      ]],
    })}

  get _name() {return this.form.get('name'); }
  get _time() {return this.form.get('time'); }
  get _description() {return this.form.get('description'); }
  get _customTimeLimit() {return this.form.get('customTimeLimit'); }
  get _price() {return this.form.get('price'); }
  get _currency() {return this.form.get('currency'); }
  selectTypeToggle(){
    this.selectTypeIsOpen = !this.selectTypeIsOpen
  }
  selectTypeOption(option: any){
    this.selectTypeIsOpen = false
    this.selectedTypeOptionValue = option
  }

  selectPeriodToggle(){
    this.selectPeriodIsOpen = !this.selectPeriodIsOpen
  }
  selectPeriodOption(option: any){
    this.selectPeriodIsOpen = false
    this.selectedPeriodOptionValue = option
  }

  
  hasDayOfWeek(day: string): boolean{
    return this.daysOfWeek.includes(day)
  }
  toggleDayInDaysOfWeek(day: string){
    if(!this.daysOfWeek.includes(day)){
      this.daysOfWeek.push(day)
    }else if(this.daysOfWeek.includes(day)){
      this.daysOfWeek = this.daysOfWeek.filter(d => d != day)
    }
  }
  
  onSubmit(){
    let timeArr = this._time?.value.split(':')
    let subscriptionSubmit = {
      name: this._name?.value,
      discription: this._description?.value,
      status_subscription: {
        type_sub: this.selectedTypeOptionValue.value,
        time_limited: this.selectedTypeOptionValue.value == 1 ? this.selectedPeriodOptionValue.value : -1,
        custom_timeLimit: this.selectedTypeOptionValue.value == 0 ? Number(this._customTimeLimit?.value) : null,
      },
      price_subscription: {
        price: Number(this._price?.value),
        currency: this._currency?.value
      },
      days_of_week: this.isAutomatly ?  this.daysOfWeek : null,
      automatically_management: this.selectedTypeOptionValue.value == 0 ? this.isAutomatly : false,
      time: this.isAutomatly ?  timeArr : null,
      id_scheduler: this.idScheduler,
      cron_id: this.idCron,
      id: this.idSubscription
      
    }

    this.aSub = this.service.editSubscription(subscriptionSubmit).subscribe(
      (response: SubscriptionData) => {
        console.log(response)
        this.router.navigate(['/user/sub'])
        this.aSub.unsubscribe()
      },
      error => {
        console.log(error)
        this.aSub.unsubscribe()
      }
    )
  }
}
