import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      let roles = route.data['roles'] as Array<string>;
      // console.log('roles:');
      // console.log(roles);

      this.authenticationService.getAuth()
      .then((data) => {
        // console.log('AuthenticationGuard: Authenticated');
        // console.log(data);
        // this.router.navigate(['/dashboard']);

        if(roles == undefined){
          resolve(true);
        }else{
          let user = data.response.data.user;

          let hasRole = false;
          for(let i = 0; i < user.roles.length && !hasRole; i++){
            for(let j = 0; j < roles.length && !hasRole; j++){
              if(user.roles[i].name == roles[j]){
                hasRole = true;
              }
            }
          }

          resolve(hasRole);
        }
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
