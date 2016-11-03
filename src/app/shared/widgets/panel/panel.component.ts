import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'panel',
  template: `
    <div class="panel" [ngClass]="this.type">
      <div class="panel-heading">
        <h3 class="panel-title">
          <ng-content select="[title]"></ng-content>
        </h3>
      </div>
      <div class="panel-body">
        <ng-content select="[body]"></ng-content>
      </div>
    </div>
  `
})
export class PanelComponent implements OnInit {
  @Input() type;

  constructor() { }

  ngOnInit() {
    if (this.type) {
      this.type = `panel-${this.type}`;
    } else {
      this.type = 'panel-default';
    }
  }
}
