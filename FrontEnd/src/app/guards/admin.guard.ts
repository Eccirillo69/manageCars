import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/service/autentificazione.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.checkIsAuthenticated();
    const isAdmin = this.authService.getRole() === 'ADMIN';

    if (!isAdmin) {
        window.alert('You have to be admin to go on this page.');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}