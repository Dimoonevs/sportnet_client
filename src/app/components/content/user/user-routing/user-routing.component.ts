import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/service/security-service';
import { SubscriptionService } from 'src/app/service/subscription-service';

@Component({
  selector: 'app-user-routing',
  templateUrl: './user-routing.component.html',
  styleUrls: ['./user-routing.component.css']
})
export class UserRoutingComponent {
  constructor(private security: SecurityService, private router: Router, private serviceSubscription: SubscriptionService) {
    serviceSubscription.getSubscriptions().subscribe(
      (response: any) => {
      }
    )
  }

  logout(){
    this.security.logout()
    this.router.navigate(['/form/sign-in']).then(() => {
      window.location.reload();
    });
  }
}
