import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs";
import { GroupData } from "../modules/data";

@Injectable({
    providedIn: 'root'
})

export class GroupService { 
    groupForEdit!: GroupData
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private toastr: ToastrService) { }

    createGroup(group: any){
        return this.http.post<any>('http://localhost:8000/group', group).pipe(
            tap(
                (response: any) => {
                }
            )
        )
    }

    getGroups(){
        return this.http.get<any>('http://localhost:8000/group')
    }

    editGroup(group: any){
        return this.http.put<any>('http://localhost:8000/group', group).pipe(
            tap(
                (response: any) => {
                }
            )
        )
    }

    setGroupForEdit(group: GroupData){
        this.groupForEdit = group
    }

    getGroupForEdit(){
        return this.groupForEdit
    }
}