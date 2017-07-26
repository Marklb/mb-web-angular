import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }   from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  private _opened: boolean = false;
  public _showSidebar: boolean = false;
  private subscription: Subscription;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    // subscribe to home component messages
    this.subscription = this.authenticationService.isAuthenticated().subscribe(
      value => { this._showSidebar = value.value; console.log(value); });
  }

  ngOnInit() {
    // this.authenticationService.getAuth()
    // .then((data) => {
    //   // console.log('Authenticated');
    //   // console.log(data);
    //   // this.router.navigate(['/dashboard']);
    //   this._showSidebar = true;
    // })
    // .catch((err) => {
    //   // console.log('Not Authenticated');
    //   // console.log(err);
    //   this._showSidebar = false;
    // });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

}
