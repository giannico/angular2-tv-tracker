import { NgModule } from '@angular/core';

import { LogInModule } from './log-in/log-in.module';
import { SignUpModule } from './sign-up/sign-up.module';

@NgModule({
  imports: [ LogInModule, SignUpModule ],
  declarations: [ ]
})
export class AuthModule {};
