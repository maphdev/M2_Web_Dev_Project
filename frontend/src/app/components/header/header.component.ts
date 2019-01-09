import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
