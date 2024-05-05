import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionData } from 'src/app/modules/data';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-subscription-data',
  templateUrl: './subscription-data.component.html',
  styleUrls: ['./subscription-data.component.css']
})
export class SubscriptionDataComponent implements OnInit{
  optionsPeriod = [
    {value: 0 ,lable:'Week'},
    {value: 1 ,lable:'Month'},
    {value: 2 ,lable:'Year'},
  ]

  subcscriptions!: SubscriptionData[]
  constructor(private router: Router, private toastr: ToastrService, private service: SubscriptionService){
  }


  ngOnInit(): void {
    this.subcscriptions = []
    this.subcscriptions = this.service.getSubscriptionsData()
    if (this.subcscriptions == undefined){
      this.service.getSubscriptions().subscribe(
        (response: any) => {
          this.subcscriptions = response.subscriptions
        }
      )
    }
    console.log(this.subcscriptions)
  }

  editSubscription(subscription: SubscriptionData){
    this.service.setSubscriptionData(subscription)
    this.router.navigate(['/user/sub/edit'])
  }


}
