import { Component } from '@angular/core';

import { AuthManager, Notifier } from '../../../core';
import { UpdateEmailFormData } from '../components/update-email-form/update-email-form.component';

@Component({
    selector: 'my-email-tab-view',
    templateUrl: './my-email-tab-view.component.html'
})
export class MyEmailTabViewComponent {
    errorMessage: string;

    constructor(
        private authManager: AuthManager,
        private notifier: Notifier
    ) {}

    ////////////////////

    onEmailUpdate($event: UpdateEmailFormData) {
        this.errorMessage = null;

        this.authManager.updateEmail($event.email)
            .then(() => { this.notifier.success('Profile successfully updated.'); })
            .catch((error) => {
                this.errorMessage = error.message;
                this.notifier.error('An error occurred while updating the email.');
            });
    }
}
