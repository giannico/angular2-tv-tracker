import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../core';

import { AllShowsViewComponent } from './all-shows-view/all-shows-view.component';
import { MyFavoriteShowsViewComponent } from './my-favorite-shows-view/my-favorite-shows-view.component';

const showsRoutes: Routes = [
  {
    path: 'shows',
    component: AllShowsViewComponent,
    data: {
      title: 'Shows'
    }
  },
  {
    path: 'my-favorite-shows',
    component: MyFavoriteShowsViewComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'My Favorite Shows',
      requireAuthentication: true
    }
  }
];

export const ShowsRoutingModule: ModuleWithProviders = RouterModule.forChild(showsRoutes);
