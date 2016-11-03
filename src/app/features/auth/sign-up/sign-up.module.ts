import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { SignUpViewComponent } from './sign-up-view.component';

import { SignUpFormComponent } from './_components/sign-up-form/sign-up-form.component';

import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  imports: [SharedModule, SignUpRoutingModule],
  declarations: [SignUpViewComponent, SignUpFormComponent]
})
export class SignUpModule {};
