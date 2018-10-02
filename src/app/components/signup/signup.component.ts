import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../../services/auth.service';
import { LoginData } from '../../models/login-data';
import { SignUpResponse } from '../../models/SignUpResponse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupData: LoginData = new LoginData();
  message = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  signup() {
    debugger;
    this.auth.signup(this.signupData).subscribe((resp: SignUpResponse) => {
      debugger;
      if(resp.success) {
        this.router.navigate(['login']);
      } else {
        this.message = resp.msg;
      }
    }, err => {
      debugger;
      this.message = err.error.msg;
    });


  }

  ngOnInit() {
  }

}
