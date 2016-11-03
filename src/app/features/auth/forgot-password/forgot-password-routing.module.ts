import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordViewComponent } from './forgot-password-view.component';
import { UnauthenticatedGuard } from '../../../core';

const routes: Routes = [{
    path: 'forgot-password',
    component: ForgotPasswordViewComponent,
    canActivate: [ UnauthenticatedGuard ],
    data: {
        title: 'Forgot Password'
    }
}];

export const ForgotPasswordRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
