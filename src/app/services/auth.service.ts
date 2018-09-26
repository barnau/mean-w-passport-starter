import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../models/login-data';
import { CommonValues } from '../common/commonValues';
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { User } from '../models/user';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  options: any = {'headers': new HttpHeaders({'Content-Type': 'application/json'})}
  apiBase: string = CommonValues.devApi;
  currentUser: User;
  constructor(private http: HttpClient) { }

  login(loginData: LoginData) {
    return this.http.post(this.apiBase + '/signin', loginData)
    .pipe(tap((data: LoginResponse) => {
      debugger;
      console.log(data);
      this.currentUser = new User();
      this.currentUser.token = data.token;
      this.currentUser.userName = loginData.username;
      localStorage.setItem('jwtToken', data.token);
    }))
    .pipe(catchError(err => { return of(false)}))
  }

  isAutheticated() {
    return !! this.currentUser;
  }

  logout() {
    this.currentUser = undefined;
  }
}