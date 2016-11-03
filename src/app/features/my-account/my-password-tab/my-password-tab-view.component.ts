import { Component } from '@angular/core';

import { AuthManager, Notifier } from '../../../core';
import { UpdatePasswordFormData } from '../components/update-password-form/update-password-form.component';

@Component({
    selector: 'my-password-tab-view',
    templateUrl: './my-password-tab-view.component.html'
})
export class MyPasswordTabViewComponent {
    errorMessage: string;

    constructor(
        private authManager: AuthManager,
        private notifier: Notifier
    ) {}

    ////////////////////

    onPasswordUpdate($event: UpdatePasswordFormData) {
        this.authManager.updatePassword($event.newPassword)
            .then(() => { this.notifier.success('Password successfully updated.'); })
            .catch((error) => {
                this.errorMessage = error.message;
                this.notifier.error('An error occurred while updating the password.');
            });
    }
}
