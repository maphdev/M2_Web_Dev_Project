import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserDetails;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(resp => {
      this.userDetails = resp.user;
    }, (err) => {
      console.error(err);
    });
  }

}
