import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { MyAccountModule } from './my-account/my-account.module';
import { ShowsModule } from './shows/shows.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    HomeModule,
    MyAccountModule,
    ShowsModule,
    AuthModule
  ],
  declarations: []
})
class FeaturesModule {};

export { FeaturesModule };
