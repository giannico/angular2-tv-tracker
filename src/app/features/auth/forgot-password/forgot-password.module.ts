import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ForgotPasswordViewComponent } from './forgot-password-view.component';

import { ForgotPasswordFormComponent } from
    './_components/forgot-password-form/forgot-password-form.component';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  imports: [ SharedModule, ForgotPasswordRoutingModule ],
  declarations: [ ForgotPasswordViewComponent, ForgotPasswordFormComponent ]
})
export class ForgotPasswordModule {};
