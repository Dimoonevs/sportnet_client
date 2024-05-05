import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { AthleteServiceClient } from "../proto/athletes.pbsc";
import { AthleteRequest, AthleteResponse, GetAthletesRequest } from "../proto/athletes.pb";
import { GrpcMetadata } from "@ngx-grpc/common";
import { Observable, tap } from "rxjs";
import { AthleteData, requestForSelected } from "../modules/data";
@Injectable({
    providedIn: 'root'
})

export class AthletService {

    selectAthlet!: AthleteData

    constructor( private client: AthleteServiceClient, private http: HttpClient, private cookieService: CookieService, private router: Router, private toastr: ToastrService) {
    }
    
    createAthlet(athlet: any){
        return this.http.post<any>('http://localhost:8000/athlete', athlet).pipe(
            tap(
                (response: any) => {
                }
            )
        )
    }

    getAllAthlet(request: GetAthletesRequest): Observable<AthleteRequest> {
        const metadata = new GrpcMetadata();
        metadata.set('token', `${this.cookieService.get('token')}`);
        return this.client.getAthletes(request, metadata).pipe()
    }

    deleteAthletes(request: any) {
        return this.http.request('DELETE', 'http://localhost:8000/athlete', { body: { id: request } });

    }
    editAthletes(request: any) {
        return this.http.put<any>('http://localhost:8000/athlete', request).pipe(
            tap(
                (response: any) => {
                }
            )
        );
    }
    addTraining(request: any ){
        return this.http.put<any>('http://localhost:8000/athlete/training', request).pipe(
            tap(
                (response: any) => {
                }
            )
        );
    }

    setSelectAthlet(athlet: AthleteData){
        this.selectAthlet = athlet
    }
    getSelectAthlet(){
        return this.selectAthlet
    }
  
}