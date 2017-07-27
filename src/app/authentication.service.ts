import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import $ from 'jquery';

const AUTHENITICATION_TOKEN_KEY = 'MBTOKEN';

@Injectable()
export class AuthenticationService {
  public apiUrl: string = `http://${window.location.hostname}:1337`;
  private authenticated = new Subject<any>();
  private user = new BehaviorSubject<any>(undefined);


  constructor() { }

  userObserver(): Observable<any> {
    return this.user.asObservable();
  }

  isAuthenticated(): Observable<any> {
    return this.authenticated.asObservable();
  }

  getAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getToken()
      .then((data) => {
        // resolve(data);
        let headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${data}`
        };
        // console.log(headers);

        $.ajax({
          method: "POST",
          url: `${this.apiUrl}/isAuthenticated`,
          async: true,
          crossDomain: true,
          // processData: false,
          // data: data,
          // data: JSON.stringify({

          // }),
          headers: headers
        })
        .done(( msg ) => {
          // alert( "Data Saved: " + msg );
          // console.log('Is Authenticated');
          // console.log(msg);
          this.authenticated.next(true);
          this.user.next(msg.response.data.user);
          console.log(msg.response.data.user);
          resolve(msg);
        })
        .fail(( jqXHR, textStatus ) => {
          // alert( "Request failed: " + textStatus );
          // console.log('Not Authenticated');
          // console.log(jqXHR);
          // console.log(textStatus);
          this.authenticated.next(false);
          reject(textStatus);
        });
      })
      .catch((err) => {
        this.authenticated.next(false);
        reject(err);
      });
    });
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      let token = JSON.parse(localStorage.getItem(AUTHENITICATION_TOKEN_KEY)).token;
      if(token){
        resolve(token);
      }else{
        reject(null);
      }
    });
  }

  register(username: string, email: string, password: string,
    confirmPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };

      // console.log(data);

      $.ajax({
        method: "POST",
        url: `${this.apiUrl}/signup`,
        async: true,
        crossDomain: true,
        // processData: false,
        // data: data,
        data: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
      .done(( msg ) => {
        // alert( "Data Saved: " + msg );
        // console.log(msg);

        // localStorage.setItem(AUTHENITICATION_TOKEN_KEY, msg.response.data.token);
        this.authenticated.next(true);
        resolve(msg);
      })
      .fail(( jqXHR, textStatus ) => {
        // alert( "Request failed: " + textStatus );
        // console.log(jqXHR);
        // console.log(textStatus);
        this.authenticated.next(false);
        reject(textStatus);
      });
    });
  }

  login(email: string, password: string, rememberMe: Boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = {
        email: email,
        password: password
      };

      // console.log(data);

      $.ajax({
        method: "POST",
        url: `${this.apiUrl}/login`,
        async: true,
        crossDomain: true,
        // processData: false,
        // data: data,
        data: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
      .done(( msg ) => {
        // alert( "Data Saved: " + msg );
        // console.log(msg);

        if(rememberMe){
          localStorage.setItem(AUTHENITICATION_TOKEN_KEY, JSON.stringify({
            id: msg.response.data.user.id,
            token: msg.response.data.token
          }));
        }else{
          localStorage.removeItem(AUTHENITICATION_TOKEN_KEY);
        }
        this.authenticated.next(true);
        resolve(msg);
      })
      .fail(( jqXHR, textStatus ) => {
        // alert( "Request failed: " + textStatus );
        // console.log(jqXHR);
        // console.log(textStatus);
        this.authenticated.next(false);
        reject(textStatus);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(AUTHENITICATION_TOKEN_KEY);
      this.authenticated.next(false);
      resolve(true);
    });
  }

}
