import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { SubscriptionData, SubscriptionResp, SubscriptionSubmit } from "../modules/data";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    subcscriptions!: SubscriptionData[]
    subcscription!: SubscriptionData
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private toastr: ToastrService) { }

    createSubscription(data: SubscriptionSubmit | any): Observable<SubscriptionResp> {
        return this.http.post<SubscriptionResp>("http://localhost:8000/sub/create", data).pipe(
            tap(
                (response: SubscriptionResp) => {
                    console.log(response)
                }
            )
        )
    }

    getSubscriptions(): Observable<any> {
        return this.http.get<any>("http://localhost:8000/user/sub").pipe(
            tap(
                (response: any) => {
                   this.subcscriptions = response.subscriptions
                   this.subcscriptions.push({
                    id: 0, 
                    name: "None", 
                    description: "", 
                    time: ["0","0"], 
                    price: 0, 
                    currency: "", 
                    customTimeLimited: 0,
                    typeSub: "0", 
                    timeLimited: "0", 
                    automaticallyManagement: false,
                    daysOfWeek: [],
                    cronId: 0,
                    idScheduler: 0
                })
                   if (this.subcscriptions.length  < response.subscriptions + 1){
                       
                   }
                }
            )
        )
    }

    editSubscription(data: SubscriptionData | any): Observable<SubscriptionData> {
        return this.http.put<SubscriptionData>("http://localhost:8000/user/sub", data).pipe(
            tap(
                (response: SubscriptionData) => {
                    console.log(response)
                }
            )
        )
    }

    getSubscriptionsData(): SubscriptionData[] {
        return this.subcscriptions
    }

    optionsPerion = [
        {value: 0 ,lable:'Week'},
        {value: 1 ,lable:'Month'},
        {value: 2 ,lable:'Year'},
    ]
    getOptionsPerion(){
        console.log("OK")
        return this.optionsPerion
    }

    optionsType = [
        {value: 0 , text:'Fixed number of days', lable:"FIXED_COUNT"},
        {value: 1 ,text:'For a specific period', lable:"DATE_LIMITED"}
    ]
    getOptionsType(){
        return this.optionsType
    }

    setSubscriptionData(data: SubscriptionData){
        this.subcscription = data
    }
    getSubscriptionData(){
        return this.subcscription
    }
}
