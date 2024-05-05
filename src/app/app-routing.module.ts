import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAuthComponent } from './components/content/security/form-auth/form-auth.component';
import { SignInComponent } from './components/content/security/sign-in/sign-in.component';
import { SignUpComponent } from './components/content/security/sign-up/sign-up.component';
import { ConfirmEmailComponent } from './components/content/security/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './components/content/security/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './components/content/security/reset-password-confirm/reset-password-confirm.component';
import { UserRoutingComponent } from './components/content/user/user-routing/user-routing.component';
import { InformationUserComponent } from './components/content/user/information-user/information-user.component';
import { EditUserComponent } from './components/content/user/edit-user/edit-user.component';
import { AuthGuard } from './service/auth.guard';
import { SubscriptionUserComponent } from './components/content/user/subscription/subscription-user/subscription-user.component';
import { SubscriptionCreateComponent } from './components/content/security/subscription-create/subscription-create.component';
import { SubscriptionDataComponent } from './components/content/user/subscription/subscription-data/subscription-data.component';
import { EditSubscriptionComponent } from './components/content/security/edit-subscription/edit-subscription.component';
import { GroupsUserComponent } from './components/content/user/groups/groups-user/groups-user.component';
import { GroupsDataComponent } from './components/content/user/groups/groups-data/groups-data.component';
import { GroupCreateComponent } from './components/content/security/group-create/group-create.component';
import { EditGroupComponent } from './components/content/security/edit-group/edit-group.component';
import { AthletCreateComponent } from './components/content/security/athlet-create/athlet-create.component';
import { EditAthletComponent } from './components/content/security/edit-athlet/edit-athlet.component';


const routes: Routes = [
  { path: 'form', component: FormAuthComponent, children: [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent }
  ]},
  { path: 'confirm/email', component: ConfirmEmailComponent },
  { path: 'reset/password', component: ResetPasswordComponent },
  { path: 'reset/password/confirm', component: ResetPasswordConfirmComponent },
  { path: 'user', component: UserRoutingComponent, canActivate: [AuthGuard], children: [
    { path: 'info', component: InformationUserComponent },
    { path: 'edit', component: EditUserComponent },
    { path: 'sub', component: SubscriptionUserComponent, children: [
      { path: 'create', component: SubscriptionCreateComponent },
      { path: '', component: SubscriptionDataComponent },
      { path: 'edit', component: EditSubscriptionComponent}
    ]},
    { path: 'group', component: GroupsUserComponent, children: [
      { path: '', component: GroupsDataComponent },
      { path: 'create', component: GroupCreateComponent },
      { path: 'edit', component: EditGroupComponent}
    ]},
    { path: 'athlet', children: [
      { path: 'create', component: AthletCreateComponent },
      { path: 'edit', component: EditAthletComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }