import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/account/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOptionsPageGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.getUserRole() != 'admin' || this.authService.isLoggedOut()) {
      return this.router.createUrlTree(['/sight', 'search']);
    }

    return true;
  }
  
}
