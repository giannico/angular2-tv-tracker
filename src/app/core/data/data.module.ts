// CoreModule that we import once when the app starts, and never import anywhere else.
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { UsersDataService } from './data-services/users.data-service';
import { ShowsDataService } from './data-services/shows.data-service';

////////////////////////////////////////

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    UsersDataService, ShowsDataService
  ],
  exports: []
})
export class DataModule {
  constructor( @Optional() @SkipSelf() parentModule: DataModule) {
    if (parentModule) {
      throw new Error('DataModule is already loaded. Import it in the AppModule only');
    }
  }
}
