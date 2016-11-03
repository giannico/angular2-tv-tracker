import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { LogInViewComponent } from './log-in-view.component';

import { LogInFormComponent } from './_components/log-in-form/log-in-form.component';

import { LogInRoutingModule } from './log-in-routing.module';

@NgModule({
  imports: [SharedModule, LogInRoutingModule],
  declarations: [LogInViewComponent, LogInFormComponent]
})
export class LogInModule { };
