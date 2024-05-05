import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from 'src/app/service/security-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private cookieService: CookieService, private service: SecurityService){}
  authenticated!: boolean;
  username!: string;

  ngOnInit(): void {
    this.authenticated = this.cookieService.check('token');
    this.username = this.service.getUsernameFromToken(this.cookieService.get('token'));
  }

}
