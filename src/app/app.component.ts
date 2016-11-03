import { Component } from '@angular/core';

import { NotifierConfig } from './core';
import { notifierConfig } from './app.config';

import '../style/app.css';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  notifierConfig: NotifierConfig;

  constructor() {
    this.notifierConfig = notifierConfig;
  }
}
