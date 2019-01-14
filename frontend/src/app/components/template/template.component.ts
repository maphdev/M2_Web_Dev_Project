import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  userDetails: UserDetails;
  toggled: boolean = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(resp => {
      this.userDetails = resp.user;
    }, (err) => {
      console.error(err);
    });
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
