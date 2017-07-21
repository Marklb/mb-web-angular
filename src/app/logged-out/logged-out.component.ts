import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.scss']
})
export class LoggedOutComponent implements OnInit {
  title = 'MB Web';

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getAuth()
    .then((data) => {
      // console.log('Authenticated');
      // console.log(data);
      this.router.navigate(['/dashboard']);
    })
    .catch((err) => {
      // console.log('Not Authenticated');
      // console.log(err);
    });
  }

}
