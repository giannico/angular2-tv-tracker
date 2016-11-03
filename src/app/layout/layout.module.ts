import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TopNavBarComponent } from './top-nav-bar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [TopNavBarComponent],
  exports: [TopNavBarComponent]
})
export class LayoutModule {
  constructor( @Optional() @SkipSelf() parentModule: LayoutModule) {
    if (parentModule) {
      throw new Error('LayoutModule is already loaded. Import it in the AppModule only');
    }
  }
}
