import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.authService.isAutheticated()) {
      debugger;
      if (this.authService.currentUser.fullAccess) {
        return true;
      } else {
        this.router.navigate(['norights']);
        return false;
      }
    }

    this.router.navigate(['login']);

    return false;
  }
}
