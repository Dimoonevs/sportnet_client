import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubscriptionResp, SubscriptionSubmit } from 'src/app/modules/data';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-subscription-create',
  templateUrl: './subscription-create.component.html',
  styleUrls: ['./subscription-create.component.css',"../form-auth/form-auth.component.css"]
})
export class SubscriptionCreateComponent implements OnInit {
  form!: FormGroup;
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
  selectedTypeOptionValue = {value: null , text:"Select Type" , lable:"NONE"}
  selectedPeriodOptionValue = {value: -1, lable:"Select Period"}
  aSub!: Subscription

  constructor(private fb: FormBuilder, private service: SubscriptionService, private router: Router, private toastr: ToastrService) {
    this._createForm()
  }

  private _createForm(){
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      time: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]],
      customTimeLimit: ['', [
        Validators.required,
      ]],
      price: ['', [
        Validators.required,
      ]],
      currency: ['', [
        Validators.required,
      ]],
    })}

  get _name() {return this.form.get('name'); }
  get _time() {return this.form.get('time'); }
  get _description() {return this.form.get('description'); }
  get _customTimeLimit() {return this.form.get('customTimeLimit'); }
  get _price() {return this.form.get('price'); }
  get _currency() {return this.form.get('currency'); }
  ngOnInit(): void {
    this.daysOfWeek = []
  }

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
        time_limited: this.selectedPeriodOptionValue.value,
        custom_timeLimit: Number(this._customTimeLimit?.value),
      },
      price_subscription: {
        price: Number(this._price?.value),
        currency: this._currency?.value
      },
      days_of_week: this.daysOfWeek,
      automatically_management: this.isAutomatly,
      time: timeArr
    }
   this.aSub = this.service.createSubscription(subscriptionSubmit).subscribe(
      (response: SubscriptionResp) => {
        this.router.navigate(['/user/sub']);
        this.toastr.success("Subscription created successfully. Welcome!", "Success create subscription");
      },
      error => {
        this.toastr.error(error.error.message, "Error create subscription")
      }
    )
  }

}
