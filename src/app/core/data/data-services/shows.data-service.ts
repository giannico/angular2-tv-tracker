import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { AngularFire } from 'angularfire2';

import { DataService } from './data-service';
import { ModelUtils, Show, PartialShow } from '../models';

@Injectable()
export class ShowsDataService implements DataService {
  type: string = 'shows';

  baseRef: firebase.database.Reference;

  constructor(private af: AngularFire) {
    this.baseRef = firebase.database().ref().child(this.type);
  }

  getAll(query: Object): Observable<Array<Show>> {
    // TODO: Query doesn't seem to work if a "ref" is passed, does work if reference "string" is passed
    return this.af.database.list(this.baseRef.toString(), query)
      .map(Show.deserializeList);
  }

  getShow(key: string): Observable<Show> {
    const itemRef = this.baseRef.child(key);
    return this.af.database.object(itemRef).take(1);
  }

  getShows(keys: Array<string>): Observable<Array<Show>> {
    return Observable.from(keys)
      .flatMap(this.getShow.bind(this))
      .bufferCount(keys.length);
  }

  getPage(pageNum: number): Observable<Show[]> {
    const query: {} = {
      query: {
        orderByChild: 'id',
        startAt: (pageNum - 1) * 100 + 1,
        limitToFirst: 100
      }
    };

    // TODO: Query doesn't seem to work if a "ref" is passed, does work if reference "string" is passed
    return this.af.database.list(this.baseRef.toString(), query)
      .map(Show.deserializeList);
  }

  //////////////////////////////////////////////////
  //// Observable Input Functions
  //////////////////////////////////////////////////

  getShowsWithFavoriteFlag(
    pageNum$: Observable<number>,
    favoriteShows$: Observable<Array<PartialShow>>,
    pageChangeDebounceTime = 300
  ): Observable<Array<Show>> {

    // An observable of shows, based on the incoming pageNumber
    const showPageData$: Observable<Array<Show>> = pageNum$
      .debounceTime(pageChangeDebounceTime)
      .switchMap(this.getPage.bind(this));

    // A map (where the key is a show id) of "favorite shows"
    const favoriteShowMap$: Observable<Map<string, PartialShow>> = favoriteShows$
      .map(ModelUtils.getForeignKeyMap);

    return Observable.combineLatest(
      showPageData$,
      favoriteShowMap$,
      this.favoriteShowEnricher);
  }

  private favoriteShowEnricher(shows: Array<Show>, favoriteShowMap: Map<string, PartialShow>) {
    return shows.map((show: Show) => {
      show.derivedData.isFavorite = favoriteShowMap.has(show.$key);
      return show;
    });
  }
}
