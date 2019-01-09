import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuardNotIdentifiedService } from './services/auth-guard-not-identified/auth-guard-not-identified.service';
import { AuthGuardIdentifiedService } from './services/auth-guard-identified/auth-guard-identified.service';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviecardComponent } from './components/moviecard/moviecard.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    HeaderComponent,
    MoviecardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, AuthGuardNotIdentifiedService, AuthGuardIdentifiedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
