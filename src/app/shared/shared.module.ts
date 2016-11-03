import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CollapseModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

// Components
import { PanelComponent } from './widgets/panel/panel.component';

// Directives
import { ShowAuthDirective } from './auth/show-auth.directive';
import { HideAuthDirective } from './auth/hide-auth.directive';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule,
    CollapseModule, DropdownModule, TabsModule
  ],
  declarations: [PanelComponent, ShowAuthDirective, HideAuthDirective],
  exports: [
    CommonModule, FormsModule, RouterModule,
    CollapseModule, DropdownModule, TabsModule,
    PanelComponent, ShowAuthDirective, HideAuthDirective
  ]
})
export class SharedModule { }
