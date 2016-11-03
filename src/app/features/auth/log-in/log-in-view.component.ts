import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager, Notifier } from '../../../core';
import { LogInFormData } from './_components/log-in-form/log-in-form.component';

@Component({
  selector: 'sign-up-view',
  templateUrl: './log-in-view.component.html'
})
export class LogInViewComponent {
  errorMessage: string = null;

  constructor(
    private authManager: AuthManager,
    private notifier: Notifier,
    private router: Router
  ) { }

  onLogIn($event: LogInFormData) {
    this.authManager
      .logIn($event.email, $event.password)
      .then(() => {
        this.notifier.success('Welcome back!');
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        this.errorMessage = error.message;
      });
  }
}
