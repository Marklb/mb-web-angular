import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout()
    .then((data) => {
      // console.log('Authenticated');
      // console.log(data);
      this.router.navigate(['/']);
    })
    .catch((err) => {
      // console.log('Not Authenticated');
      // console.log(err);
    });
  }

}
