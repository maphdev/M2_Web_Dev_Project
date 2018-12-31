import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardNotIdentifiedService } from './services/auth-guard-not-identified/auth-guard-not-identified.service';
import { AuthGuardIdentifiedService } from './services/auth-guard-identified/auth-guard-identified.service';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardIdentifiedService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardIdentifiedService]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardIdentifiedService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardNotIdentifiedService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
