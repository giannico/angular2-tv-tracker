import { Component } from '@angular/core';

import { AuthManager, Notifier } from '../../../core';
import { UpdateProfileFormData } from '../components/update-profile-form/update-profile-form.component';

@Component({
    selector: 'my-profile-tab-view',
    templateUrl: './my-profile-tab-view.component.html'
})
export class MyProfileTabViewComponent {

    constructor(
        private authManager: AuthManager,
        private notifier: Notifier
    ) {}

    ////////////////////

    onProfileUpdate($event: UpdateProfileFormData) {
        this.authManager.updateName($event.name)
            .then(() => { this.notifier.success('Profile successfully updated.'); })
            .catch(() => { this.notifier.error('An error occurred while updating the profile.'); });
    }
}
