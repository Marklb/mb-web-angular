import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';

import { AuthenticationService } from './authentication.service';

import { AuthenticationGuard } from './authentication-guard';

import { SidebarModule } from 'ng-sidebar';
import { MainNavMenuComponent } from './main-nav-menu/main-nav-menu.component';
import { DataRelationOrganizerComponent } from './data-relation-organizer/data-relation-organizer.component';


const routes = RouterModule.forRoot([
  {
    path: 'logged-out',
    component: LoggedOutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'data-relation-organizer',
    component: DataRelationOrganizerComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['DataRelationOrganizer'] }
  },
  {
    path: '',
    component: LoggedOutComponent
  },
  // {
  //   path: '',
  //   redirectTo: '/logged-out',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
])


@NgModule({
  declarations: [
    AppComponent,
    LoggedOutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LogoutComponent,
    SidebarContentComponent,
    MainNavMenuComponent,
    DataRelationOrganizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routes,
    SidebarModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
