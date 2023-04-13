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
export class AuthUserGuard implements CanActivate {
  constructor(
    public UserService: RealtimeService, public router: Router,
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //

       // this.router.navigate(['/systeme']);

    return true;

  }

}
