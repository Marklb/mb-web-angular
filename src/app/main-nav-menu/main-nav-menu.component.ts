import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }   from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Roles } from '../decorators/role-decorator';

import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-main-nav-menu',
  templateUrl: './main-nav-menu.component.html',
  styleUrls: ['./main-nav-menu.component.scss']
})
@Roles('MainNavMenu')
export class MainNavMenuComponent implements OnInit,OnDestroy {
  private userSubscription: Subscription;
  public user: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.userSubscription = this.authenticationService.userObserver().subscribe(
      value => { this.user = value; });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userSubscription.unsubscribe();
  }

}
