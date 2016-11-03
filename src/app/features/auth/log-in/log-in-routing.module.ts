import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInViewComponent } from './log-in-view.component';
import { UnauthenticatedGuard } from '../../../core';

const routes: Routes = [{
  path: 'log-in',
  component: LogInViewComponent,
  canActivate: [UnauthenticatedGuard],
  data: {
    title: 'Log In'
  }
}];

export const LogInRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
