import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager, Notifier } from '../../../core';
import { SignUpFormData } from './_components/sign-up-form/sign-up-form.component';

@Component({
  selector: 'sign-up-view',
  templateUrl: './sign-up-view.component.html'
})
export class SignUpViewComponent {
  errorMessage: string = null;

  constructor(
    private authManager: AuthManager,
    private notifier: Notifier,
    private router: Router
  ) {}

  onSignUp($event: SignUpFormData) {
    this.authManager
      .signUp($event.name, $event.email, $event.password)
      .then(() => {
        this.notifier.success('Thanks for signing up!');
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        this.errorMessage = error.message;
      });
  }
}
