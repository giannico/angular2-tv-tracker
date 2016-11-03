import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthManager } from './auth-manager.service';
import { AuthGuard } from './auth-guard.service';
import { UnauthenticatedGuard } from './unauthenticated-guard.service';

////////////////////////////////////////

@NgModule({
  imports: [],
  declarations: [],
  providers: [AuthManager, AuthGuard, UnauthenticatedGuard],
  exports: []
})
export class AuthModule {
  constructor( @Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
