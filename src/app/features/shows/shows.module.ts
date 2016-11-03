import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { AllShowsViewComponent } from './all-shows-view/all-shows-view.component';
import { MyFavoriteShowsViewComponent } from './my-favorite-shows-view/my-favorite-shows-view.component';

import { ShowNavBarComponent } from './_components/show-nav-bar/show-nav-bar.component';
import { ShowTileComponent } from './_components/show-tile/show-tile.component';

import { ShowsRoutingModule } from './shows-routing.module';

@NgModule({
  imports: [SharedModule, ShowsRoutingModule],
  declarations: [
    AllShowsViewComponent, MyFavoriteShowsViewComponent,
    ShowNavBarComponent, ShowTileComponent
  ]
})
export class ShowsModule {};
