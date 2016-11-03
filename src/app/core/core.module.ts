// CoreModule that we import once when the app starts, and never import anywhere else.
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthProviders, AuthMethods, AngularFireModule } from 'angularfire2';

import { SharedModule } from '../shared/shared.module';

import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';

// TODO: Refactor this
export const firebaseConfig = {
  apiKey: 'AIzaSyAecvZJO6oZHxHX9T0uWiOnIGqmu5lcG84',
  authDomain: 'andre-test-5575f.firebaseapp.com',
  databaseURL: 'https://andre-test-5575f.firebaseio.com',
  storageBucket: 'andre-test-5575f.appspot.com'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  imports: [
    HttpModule, RouterModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),

    DataModule,
    AuthModule, ServicesModule, SharedModule
  ],
  declarations: [],
  exports: [HttpModule, ServicesModule]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
