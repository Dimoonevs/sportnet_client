import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from './service/security-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sportsAppClient';
  constructor(private cookieService: CookieService, private security: SecurityService) { }

  ngOnInit() {
    var isCookieExists: boolean = this.cookieService.check('token');
    var token = this.cookieService.get('token');
    
    console.log("Token: ", token);
    console.log('Is cookie exists: ', isCookieExists);
  }
}
