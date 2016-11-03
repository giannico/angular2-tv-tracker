// CoreModule that we import once when the app starts, and never import anywhere else.
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { Notifier } from './notifier.service';

////////////////////////////////////////

@NgModule({
  imports: [ToasterModule],
  declarations: [],
  providers: [Notifier],
  exports: [ToasterModule]
})
export class ServicesModule {
  constructor( @Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error('Services module is already loaded. Import it in the AppModule only');
    }
  }
}
