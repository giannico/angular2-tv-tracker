import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthManager, ShowsDataService, UsersDataService, PartialShow, Show } from '../../../core';

@Component({
  selector: 'all-shows-view',
  templateUrl: './all-shows-view.component.html'
})
export class AllShowsViewComponent implements OnInit {
  pageNum$: Observable<number>;
  favoriteShows$: Observable<Array<PartialShow>>;
  shows$: Observable<Array<Show>>;

  constructor(
    private authManager: AuthManager,
    private showsDataService: ShowsDataService,
    private usersDataService: UsersDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pageNum$ = this.route
      .queryParams
      .map((params: Params) => parseInt(params['pageNum'], 10) || 1);

    if (this.authManager.isAuthenticated()) {
      this.favoriteShows$ = this.usersDataService
        .getFavoriteShows(this.authManager.user.uid);
    } else {
      this.favoriteShows$ = Observable.of([]);
    }

    this.shows$ = this.showsDataService
      .getShowsWithFavoriteFlag(this.pageNum$, this.favoriteShows$);
  }

  ////////////////////

  addShowToFavorites(show: Show) {
    this.usersDataService
      .addShowToUser(this.authManager.user.uid, show);
  }

  removeShowFromFavorites(show: Show) {
    this.usersDataService
      .removeShowFromUser(this.authManager.user.uid, show);
  }
}
