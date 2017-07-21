import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authenticationService.getAuth()
      .then((data) => {
        // console.log('AuthenticationGuard: Authenticated');
        // console.log(data);
        // this.router.navigate(['/dashboard']);
        resolve(true);
      })
      .catch((err) => {
        // console.log('AuthenticationGuard: Not Authenticated');
        // console.log(err);
        this.router.navigate(['/']);
        resolve(false);
      });
    });
  }
}
