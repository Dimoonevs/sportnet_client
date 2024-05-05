import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AthleteData, GroupData } from 'src/app/modules/data';
import { GetAthletesRequest } from 'src/app/proto/athletes.pb';
import { AthletService } from 'src/app/service/athlet-serivece';
import { GroupService } from 'src/app/service/group-service';
import * as moment from 'moment';

@Component({
  selector: 'app-groups-data',
  templateUrl: './groups-data.component.html',
  styleUrls: ['./groups-data.component.css']
})
export class GroupsDataComponent {

  groups!: GroupData[]
  athletsId!: number
  selectedIndex!: number;
  getAthletRequest!: GetAthletesRequest
  subscription: Subscription = new Subscription();
  openForm = false
  openEditForm = false
  days!: number
  athlets!: Map<number, any>
  selectedAthlet!: number[]
  popupDelete: boolean = false
  popupAddDays: boolean = false
  popupContinuationDays: boolean = false

  constructor (private service: GroupService, private serviceAthlet: AthletService) {
    this.groups = []
    service.getGroups().subscribe((response: any) => {
      this.groups = response.groups
      if (this.groups.length > 0) {
        this.getAthlets(this.groups[0], 0);
        service.setGroupForEdit(this.groups[0])
      }
    })
    console.log()

    this.athlets = new Map<number, any>()
    this.selectedAthlet = []
  }

  getAthlets(group: GroupData, i: number){
    this.openForm = false
    this.openEditForm = false
    this.subscription.unsubscribe();
    this.athlets = new Map<number, any>()
    this.athletsId = group.id

    this.selectedIndex = i
    this.service.setGroupForEdit(group)

    this.getAthletRequest = new GetAthletesRequest()
    this.getAthletRequest.groupId = this.athletsId
    this.subscription = this.serviceAthlet.getAllAthlet(this.getAthletRequest).subscribe({
      next:(response: any) => {
        this.athlets.set(response.id, response)
      }
    })
    console.log(this.athlets)
  }
  selectAthlet(id: number){
    if (this.selectedAthlet.includes(id)) {
      this.selectedAthlet.splice(this.selectedAthlet.indexOf(id), 1)
    } else {
      this.selectedAthlet.push(id)
    }
  }

  hasId(id: number) {
    return this.selectedAthlet.includes(id)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleForm(){
    this.openForm = !this.openForm
    this.openEditForm = false
  }

  deleteAthletsOpenAccespts(){
    if (this.selectedAthlet.length > 0) {
      this.popupDelete = !this.popupDelete
      return
    }
  }
  addDaysInAthleteOpen() {
    if (this.selectedAthlet.length > 0) {
      this.popupAddDays = !this.popupAddDays
    }
  }
  continuationDaysInAthleteOpen(){
    if (this.selectedAthlet.length > 0) {
      this.popupContinuationDays = !this.popupContinuationDays
    }
  }

  addDaysInAthlets(){
    let req = {
      training: [{}]
    }

    for (let i = 0; i < this.selectedAthlet.length; i++) {
      let athlete = {
        id: this.selectedAthlet[i],
        days_left: this.days
      }
      req.training.push(athlete)
    }

    console.log(req)

    this.serviceAthlet.addTraining(req).subscribe((response: any) => {
      console.log(response)
    })
    this.selectedAthlet = []
    this.days = 0
    this.popupAddDays = !this.popupAddDays
  }

  continuationDaysInAthlets(){
    let req = {
      training: [{}]
    }

    for (let i = 0; i < this.selectedAthlet.length; i++){
      let originalMoment = moment(this.athlets.get(this.selectedAthlet[i])._dateLast, 'DD.MM.YYYY');
      let newMoment = originalMoment.add(this.days, 'days');
      let athlete = {
        id: this.selectedAthlet[i],
        date_last: newMoment.format('DD.MM.YYYY')
      }
      req.training.push(athlete)
    }


    this.serviceAthlet.addTraining(req).subscribe((response: any) => {
      console.log(response)
    })
    this.selectedAthlet = []
    this.days = 0
    this.popupAddDays = !this.popupAddDays
  }

  deleteAthlets(){
    this.serviceAthlet.deleteAthletes(this.selectedAthlet).subscribe((response: any) => {
      
    })
    for (let i = 0; i < this.selectedAthlet.length; i++) {
      this.athlets.delete(this.selectedAthlet[i])
    }
    this.selectedAthlet = []
    this.popupDelete = !this.popupDelete
  }
  closePopup(){
    this.popupDelete = false
    this.popupAddDays = false
    this.popupContinuationDays = false
  }

  editAthlet(athlete: AthleteData){
    let formContentNav = document.querySelector('.form_content_button')
    if (formContentNav != null) {
      formContentNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.serviceAthlet.setSelectAthlet(athlete)
    this.openEditForm = !this.openEditForm
    this.openForm = false
  }
  isExpired(status:string){
    if (status == "Expired"){
      return true
    }
    return false
  }
}
