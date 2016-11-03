import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MyAccountRoutingModule } from './my-account-routing.module';

import { MyAccountViewComponent } from './my-account-view.component';
import { MyProfileTabViewComponent } from './my-profile-tab/my-profile-tab-view.component';
import { MyEmailTabViewComponent } from './my-email-tab/my-email-tab-view.component';
import { MyPasswordTabViewComponent } from './my-password-tab/my-password-tab-view.component';

import { UpdateProfileFormComponent } from './components/update-profile-form/update-profile-form.component';
import { UpdateEmailFormComponent } from './components/update-email-form/update-email-form.component';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';

@NgModule({
    imports: [ SharedModule, MyAccountRoutingModule ],
    declarations: [
        MyAccountViewComponent, MyProfileTabViewComponent,
        MyEmailTabViewComponent, MyPasswordTabViewComponent,
        UpdateProfileFormComponent, UpdatePasswordFormComponent, UpdateEmailFormComponent
    ]
})
export class MyAccountModule {};
