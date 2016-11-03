import { Component, Input } from '@angular/core';

@Component({
  selector: 'show-nav-bar',
  templateUrl: './show-nav-bar.component.html'
})
export class ShowNavBarComponent {
  @Input() favoriteShowCount?: number;
  @Input() showPager?: boolean;
  @Input() pageNum?: number;

  @Input() showMyFavoritesLink: boolean;
  @Input() showAllShowsLink: boolean;

  ////////////////////

  constructor() {}
}
