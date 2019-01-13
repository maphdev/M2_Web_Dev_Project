import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardNotIdentifiedService } from './services/auth-guard-not-identified/auth-guard-not-identified.service';
import { AuthGuardIdentifiedService } from './services/auth-guard-identified/auth-guard-identified.service';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TemplateComponent } from './components/template/template.component';
import { HomeComponent } from './components/home/home.component';
import { DiscovermoviesComponent } from './components/discovermovies/discovermovies.component';
import { SearchmoviesComponent } from './components/searchmovies/searchmovies.component';
import { ListsmoviesComponent } from './components/listsmovies/listsmovies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardIdentifiedService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardIdentifiedService]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardIdentifiedService]},
  {
    path: '',
    component: TemplateComponent,
    canActivate: [AuthGuardNotIdentifiedService],
    children: [
      {
        path: '',
        component: ListsmoviesComponent
      },
      {
        path: 'discover/:category/:page',
        component: DiscovermoviesComponent
      },
      {
        path: 'search',
        component: SearchmoviesComponent
      },
      {
        path: 'lists/:category',
        component: ListsmoviesComponent
      },
      {
        path: 'movie/:id',
        component: MoviedetailsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
