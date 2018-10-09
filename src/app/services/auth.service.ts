import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../models/login-data';
import { CommonValues } from '../common/commonValues';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { User } from '../models/user';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options: any = {'headers': new HttpHeaders({'Content-Type': 'application/json'})}
  apiBase: string = CommonValues.devApi;
  currentUser: User = new User();
  constructor(private http: HttpClient, private router: Router) {
   }

  login(loginData: LoginData) {
    debugger;
    return this.http.post(this.apiBase + '/signin', loginData)
    .pipe(tap((data: LoginResponse) => {
      debugger;
      console.log(data);
      this.currentUser.token = data.token;
      this.currentUser.userName = loginData.username;
      this.currentUser.fullAccess = data.fullAccess;
      localStorage.setItem('jwtToken', data.token);
    }))
    .pipe(catchError(err => of(false)))
  }

  signup(loginData: LoginData) {
    return this.http.post(this.apiBase + '/signup', loginData);
  }

  isAuthenticated() {
    return !! this.currentUser.token;
  }

  isAuthorized() {
    return !! this.currentUser && this.currentUser.fullAccess;
  }

  logout() {
    this.currentUser.fullAccess = false;
    this.currentUser.token = undefined;
    this.currentUser.userName = undefined;
    this.router.navigate(['login']);
  }
}
