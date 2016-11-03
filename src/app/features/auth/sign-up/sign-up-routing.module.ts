import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthenticatedGuard } from '../../../core';
import { SignUpViewComponent } from './sign-up-view.component';

const routes: Routes = [{
  path: 'sign-up', component: SignUpViewComponent,
  canActivate: [UnauthenticatedGuard],
  data: {
    title: 'Sign Up'
  }
}];

export const SignUpRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
