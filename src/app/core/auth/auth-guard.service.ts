import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, Router, RouterStateSnapshot } from '@angular/router';
import { AuthManager } from './auth-manager.service';
import { Notifier } from '../services/notifier.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authManager: AuthManager,
    private notifier: Notifier,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const routeData: Data = route.data;

    this.validateRouteData(routeData);

    const isAuthenticationRequired: boolean = route.data['requireAuthentication'];

    return this.isAuthenticated(url, isAuthenticationRequired);
  }

  validateRouteData(routeData: Data) {
    if (routeData['requireAuthentication'] == null) {
      throw new Error(`AuthGuard requires "requireAuthentication" route data to be defined.`);
    }
  }

  isAuthenticated(url: string, requireAuthentication) {
    if (!this.authManager.isAuthenticated()) {
      this.notifier.error('You must be authenticated to view this page.');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
