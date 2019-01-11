import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MoviecardComponent } from './components/moviecard/moviecard.component';
import { TemplateComponent } from './components/template/template.component';
import { DiscovermoviesComponent } from './components/discovermovies/discovermovies.component';

// Services
import { AuthenticationService } from './services/authentication/authentication.service';
import { MoviesApiService } from './services/movies-api/movies-api.service';
import { AuthGuardNotIdentifiedService } from './services/auth-guard-not-identified/auth-guard-not-identified.service';
import { AuthGuardIdentifiedService } from './services/auth-guard-identified/auth-guard-identified.service';
import { ListsmoviesComponent } from './components/listsmovies/listsmovies.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MoviecardComponent,
    TemplateComponent,
    DiscovermoviesComponent,
    ListsmoviesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, AuthGuardNotIdentifiedService, AuthGuardIdentifiedService, MoviesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
