import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Show } from '../../../../core';

@Component({
  selector: 'show-tile',
  templateUrl: './show-tile.component.html'
})
export class ShowTileComponent implements OnInit {
  @Input() item: Show;
  @Input() isOn: boolean;

  @Input() onButtonLabel: string;
  @Input() offButtonLabel: string;

  @Output() toggleOn: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleOff: EventEmitter<any> = new EventEmitter<any>();

  ////////////////////

  constructor() {}

  ngOnInit() {
    this.onButtonLabel = this.onButtonLabel || 'On';
    this.offButtonLabel = this.offButtonLabel || 'Off';
  }

  toggleOnHandler(item: Show) {
    this.toggleOn.emit(item);
  }

  toggleOffHandler(item: Show) {
    this.toggleOff.emit(item);
  }
}
