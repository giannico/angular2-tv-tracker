import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/cache';

import { AuthManager, UsersDataService, PartialShow, Show } from '../../../core';

@Component({
  selector: 'my-favorite-shows-view',
  templateUrl: './my-favorite-shows-view.component.html'
})
export class MyFavoriteShowsViewComponent implements OnInit {
  favoriteShows$: Observable<Array<PartialShow>>;

  constructor(
    private authManager: AuthManager,
    private usersDataService: UsersDataService,
  ) { }

  ngOnInit() {
    this.favoriteShows$ = this.usersDataService
      .getFavoriteShows(this.authManager.user.uid)
      .cache();
  }

  ////////////////////

  removeShowFromFavorites(show: Show) {
    this.usersDataService.removeShowFromUser(this.authManager.user.uid, show);
  }
}
