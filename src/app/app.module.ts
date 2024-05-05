import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/content/home/home.component';
import { FormAuthComponent } from './components/content/security/form-auth/form-auth.component';
import { SignInComponent } from './components/content/security/sign-in/sign-in.component';
import { SignUpComponent } from './components/content/security/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmEmailComponent } from './components/content/security/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './components/content/security/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './components/content/security/reset-password-confirm/reset-password-confirm.component';
import { InformationUserComponent } from './components/content/user/information-user/information-user.component';
import { EditUserComponent } from './components/content/user/edit-user/edit-user.component';
import { UserRoutingComponent } from './components/content/user/user-routing/user-routing.component';
import { AuthInterceptor } from './service/intercepters';
import { EditInformationComponent } from './components/content/security/edit-information/edit-information.component';
import { SubscriptionUserComponent } from './components/content/user/subscription/subscription-user/subscription-user.component';
import { SubscriptionCreateComponent } from './components/content/security/subscription-create/subscription-create.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SubscriptionDataComponent } from './components/content/user/subscription/subscription-data/subscription-data.component';
import { EditSubscriptionComponent } from './components/content/security/edit-subscription/edit-subscription.component';
import { GroupsUserComponent } from './components/content/user/groups/groups-user/groups-user.component';
import { GroupCreateComponent } from './components/content/security/group-create/group-create.component';
import { EditGroupComponent } from './components/content/security/edit-group/edit-group.component';
import { GroupsDataComponent } from './components/content/user/groups/groups-data/groups-data.component';
import { AthletCreateComponent } from './components/content/security/athlet-create/athlet-create.component';
import { EditAthletComponent } from './components/content/security/edit-athlet/edit-athlet.component';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    FormAuthComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    InformationUserComponent,
    EditUserComponent,
    UserRoutingComponent,
    EditInformationComponent,
    SubscriptionUserComponent,
    SubscriptionCreateComponent,
    SubscriptionDataComponent,
    EditSubscriptionComponent,
    GroupsUserComponent,
    GroupCreateComponent,
    EditGroupComponent,
    GroupsDataComponent,
    AthletCreateComponent,
    EditAthletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskDirective, NgxMaskPipe,
    GrpcCoreModule.forRoot(),
    GrpcWebClientModule.forRoot({
      settings: { host: 'http://localhost:50014' },
    }),
    
  ],
  exports: [BrowserModule],
  providers: [ CookieService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
