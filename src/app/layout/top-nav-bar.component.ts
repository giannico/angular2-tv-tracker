import { Component, OnInit } from '@angular/core';
import { Data, Router, RoutesRecognized } from '@angular/router';
import { AuthManager, Notifier } from '../core';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './top-nav-bar.component.html'
})
export class TopNavBarComponent implements OnInit {
  public isMenuCollapsed: boolean = true;

  currentRouteData: Data;

  constructor(
    public authManager: AuthManager,
    public notifier: Notifier,
    private router: Router
  ) { }

  public ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        this.currentRouteData = event.state.root.firstChild.data;
      }
    });
  }

  logOut() {
    const redirectToHome: Boolean = this.currentRouteData != null
      && this.currentRouteData['requireAuthentication'] === true;

    this.authManager.logOut();
    this.notifier.success('Come back soon!');

    if (redirectToHome) {
      this.router.navigate(['/']);
    }
  }
}
