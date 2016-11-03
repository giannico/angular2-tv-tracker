import { Component } from '@angular/core';
import { AuthManager, Notifier } from '../../../core';
import { ForgotPasswordFormData } from
    './_components/forgot-password-form/forgot-password-form.component';

@Component({
    selector: 'forgot-password-view',
    templateUrl: './forgot-password-view.component.html'
})
export class ForgotPasswordViewComponent {
    errorMessage: string = null;

    constructor(
      private authManager: AuthManager,
      private notifier: Notifier
    ) {}

    onForgotPassword($event: ForgotPasswordFormData) {
        this.authManager
            .forgotPassword($event.email)
            .then(() => {
                this.notifier.success('Password recovery sent.');
            })
            .catch((error: any) => {
                this.errorMessage = error.message;
            });
    }
}
