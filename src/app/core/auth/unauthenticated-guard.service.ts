import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthManager } from './auth-manager.service';
import { Notifier } from '../services/notifier.service';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private authManager: AuthManager,
    private notifier: Notifier,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isNotAuthenticated();
  }

  isNotAuthenticated() {
    if (this.authManager.isAuthenticated()) {
      this.notifier.error(`You're already logged in!`);
      return false;
    }

    return true;
  }
}
