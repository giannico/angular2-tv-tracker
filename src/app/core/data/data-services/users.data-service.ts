import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import { DataService } from './data-service';
import { Show, PartialShow } from '../models';

@Injectable()
export class UsersDataService implements DataService {
  type = 'users';

  baseRef: firebase.database.Reference;

  constructor(private af: AngularFire) {
    this.baseRef = firebase.database().ref().child(this.type);
  }

  addShowToUser(uid: string, show: Show): Promise<any> {
    const itemRef = this.baseRef.child(uid).child('shows').child(show.getReferenceKey());

    return itemRef.set(show.toPartialShow().toJSON());
  }

  removeShowFromUser(uid: string, show: Show | PartialShow): Promise<any> {
    const childKey: string = show instanceof Show ? show.getReferenceKey() : show.$key;

    const itemRef = this.baseRef.child(uid).child('shows').child(childKey);
    return itemRef.set(null);
  }

  getFavoriteShows(uid: string): Observable<PartialShow[]> {
    const ref = this.baseRef.child(uid).child('shows');

    return this.af.database.list(ref)
      .map(PartialShow.deserializeList);
  }
}
