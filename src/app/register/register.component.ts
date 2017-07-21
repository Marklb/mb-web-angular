import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router }   from '@angular/router';

import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.registerForm = fb.group({
      username: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(10)])]
    }, {
      validator: this.validatePasswordConfirmation
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

  validatePasswordConfirmation(group: FormGroup) {
    var pw = group.controls['password'];
    var pw2 = group.controls['confirmPassword'];

    if (pw.value !== pw2.value) {
      pw2.setErrors({validatePasswordConfirmation: true});
    }else{
      pw2.setErrors(null);
    }

    return null;
  }

  submitForm(value: any) {
    console.log(value);
    // console.log(this.register);

    this.authenticationService.register(
      value.username,
      value.email,
      value.password,
      value.confirmPassword
    )
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

    // let data = {
    //   username: this.register.username,
    //   email: this.register.email,
    //   password: this.register.password,
    //   confirmPassword: this.register.confirmPassword
    // };





    // let data = {
    //   username: value.username,
    //   email: value.email,
    //   password: value.password,
    //   confirmPassword: value.confirmPassword
    // };

    // console.log(data);

    // $.ajax({
    //   method: "POST",
    //   url: "http://localhost:1337/signup",
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
