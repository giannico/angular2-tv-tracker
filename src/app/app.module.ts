import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { FeaturesModule } from './features/features.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthManager } from './core';

@NgModule({
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,

    LayoutModule,
    FeaturesModule,
    AppRoutingModule
  ],
  providers: [
    AuthManager.initializationProvider
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
