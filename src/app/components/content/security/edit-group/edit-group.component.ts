import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GroupData, SubscriptionData } from 'src/app/modules/data';
import { GroupService } from 'src/app/service/group-service';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css',"../form-auth/form-auth.component.css"]
})
export class EditGroupComponent {
  form!: FormGroup;
  subscriptions!: SubscriptionData[]
  aSub!: Subscription
  any: any
  selectSubscriptionIsOpen = false
  selectedSubscscription!: SubscriptionData
  groupData!: GroupData

  constructor(private fb: FormBuilder, private serviceSubscription: SubscriptionService, private router: Router, private toastr: ToastrService, private service: GroupService) {
    this.subscriptions = []
    this.groupData = service.getGroupForEdit()
    this.subscriptions = this.serviceSubscription.getSubscriptionsData()
    if (this.groupData == undefined) {
      this.router.navigate(['/user/group'])
    }
    // this.subscriptions.push({ 
    //   id: 0, 
    //   name: "None", 
    //   description: "", 
    //   time: ["0","0"], 
    //   price: 0, 
    //   currency: "", 
    //   customTimeLimited: 0,
    //   typeSub: "0", 
    //   timeLimited: "0", 
    //   automaticallyManagement: false,
    //   daysOfWeek: [],
    //   cronId: 0,
    //   idScheduler: 0
    // })
    this._createForm(this.groupData.name, this.groupData.subscriptionId)
  }
  ngOnInit(): void {
  
  
  }

  private _createForm( name: string, subscriptonId: number){
    if (subscriptonId == undefined){
      this.selectedSubscscription = this.subscriptions[this.subscriptions.length - 1]
    }else{
      this.selectedSubscscription = this.subscriptions?.find(subscription => subscription.id === subscriptonId)!
    }
    this.form = this.fb.group({
      name: [name, [
        Validators.required,
      ]],
    })
  }
  get _name() {return this.form.get('name'); }

  onSubmit(){
    let groupSubmit = {
      id: this.groupData.id,
      name: this._name?.value,
      subscripton_id: this.selectedSubscscription.id
    }

    this.service.editGroup(groupSubmit).subscribe(
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
