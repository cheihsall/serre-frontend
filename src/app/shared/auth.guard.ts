import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
//import Swal from 'sweetalert2';
import { RealtimeService } from '../realtime.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public UserService: RealtimeService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.UserService.isLoggedIn !== true ) {
      this.router.navigate(['']);

    }

    return true;
  }
  canActivateUser(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //
     if( this.UserService.isLoggedIn !== true || localStorage.getItem('role') === 'Utilisateur' ){
      this.router.navigate(['']);
    }
  //   else if( this.UserService.isLoggedIn === true  && localStorage.getItem('role') == 'Utilisateur' ){
  //     return false;
  //  }
    return true;
  }

}
