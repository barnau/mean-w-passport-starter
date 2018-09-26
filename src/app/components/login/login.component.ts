import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoginData } from '../../models/login-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData = new LoginData();
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
    }

  // login() {
  //   this.http.post('http://localhost:3000/api/signin',this.loginData).subscribe(resp => {
  //     this.data = resp;
  //     localStorage.setItem('jwtToken', this.data.token);
  //     this.router.navigate(['movies']);
  //   }, err => {
  //     this.message = err.error.msg;
  //   });
  // }

  login() {
    console.log(this.loginData);
    debugger;
    this.auth.login(this.loginData)
        .subscribe( resp => {
          if(resp) {
            this.data = resp;
             this.router.navigate(['movies']);
          } else {
            this.message = 'Incorrect username or password';
          }
           
        }, err => {
          this.message = err.error.msg;
        })
  }

  ngOnInit() {
    
  }

}
