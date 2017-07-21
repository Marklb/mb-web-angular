import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router }   from '@angular/router';

import { AuthenticationService } from '../authentication.service';

import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.loginForm = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      rememberMe: true
    })
  }

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

  submitForm(value: any) {
    // console.log(value);

    let data = {
      email: value.email,
      password: value.password
    };

    // console.log(data);


    this.authenticationService.login(
      value.email,
      value.password,
      value.rememberMe
    )
    .then((data) => {
        // console.log(data);
        this.router.navigate(['/dashboard']);
    })
    .catch((err) => {
      // console.log(err);
    });

    // $.ajax({
    //   method: "POST",
    //   url: "http://localhost:1337/login",
    //   async: true,
    //   crossDomain: true,
    //   // processData: false,
    //   // data: data,
    //   data: JSON.stringify(data),
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
    // .done(function( msg ) {
    //   // alert( "Data Saved: " + msg );
    //   console.log(msg);
    // })
    // .fail(function( jqXHR, textStatus ) {
    //   // alert( "Request failed: " + textStatus );
    //   console.log(jqXHR);
    //   console.log(textStatus);
    // });
  }

}
