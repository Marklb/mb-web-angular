import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav-menu',
  templateUrl: './main-nav-menu.component.html',
  styleUrls: ['./main-nav-menu.component.scss']
})
export class MainNavMenuComponent implements OnInit {
  public username: string = 'TestUser';

  constructor() { }

  ngOnInit() {
  }

}
