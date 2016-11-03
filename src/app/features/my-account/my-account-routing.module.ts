import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core';

import { MyAccountViewComponent } from './my-account-view.component';
import { MyProfileTabViewComponent } from './my-profile-tab/my-profile-tab-view.component';
import { MyEmailTabViewComponent } from './my-email-tab/my-email-tab-view.component';
import { MyPasswordTabViewComponent } from './my-password-tab/my-password-tab-view.component';

const myAccountRoutes: Routes = [{
    path: 'my-account',
    component: MyAccountViewComponent,
    canActivate: [ AuthGuard ],
    data: {
        title: 'My Account',
        requireAuthentication: true
    },
    children: [
    {
        path: 'profile',
        component: MyProfileTabViewComponent,
        data: {
            title: 'My Profile',
            requireAuthentication: true
        }
    },
    {
        path: 'email',
        component: MyEmailTabViewComponent,
        data: {
            title: 'My Email',
            requireAuthentication: true
        }
    },
    {
        path: 'password',
        component: MyPasswordTabViewComponent,
        data: {
            title: 'My Password',
            requireAuthentication: true
        }
    }
    ]
}];

export const MyAccountRoutingModule: ModuleWithProviders = RouterModule.forChild(myAccountRoutes);
