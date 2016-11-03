import { NgModule } from '@angular/core';

import { LogInModule } from './log-in/log-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  imports: [ LogInModule, SignUpModule, ForgotPasswordModule ],
  declarations: [ ]
})
export class AuthModule {};
