import { Injectable, APP_INITIALIZER } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

import { AuthUser } from '../data';

@Injectable()
export class AuthManager {

  static initializationProvider = {
    provide: APP_INITIALIZER,
    useFactory: (manager: AuthManager) => () => {
      return manager.init();
    },
    deps: [AuthManager],
    multi: true
  };

  /////////////////////////

  public authChange$: Observable<any>;
  public user: AuthUser;

  constructor(private af: AngularFire) { }

  init(): Promise<FirebaseAuthState> {
    this.setupAuthChange$();
    this.setupAuthSubscriber();

    return this.af.auth
      .take(1)
      .toPromise();
  }

  private setupAuthChange$() {
    this.authChange$ = this.af.auth
      .asObservable()
      .map((authState: FirebaseAuthState) => {
        if (authState == null) { return null; }

        const user: firebase.User = authState.auth;
        return new AuthUser(user);
      })
      .cache();
  }

  private setupAuthSubscriber() {
    this.authChange$.subscribe((user: AuthUser) => {
      this.setUser(user);
    });
  }

  ////////////////////

  signUp(name: string, email: string, password: string) {
    return this.af.auth
      .createUser({
        email,
        password
      }).
      then(function (authState: FirebaseAuthState) {
        return authState.auth.updateProfile({
          displayName: name,
          photoURL: null
        });
      });
  }

  setUser(user: any) {
    this.user = user;
  }

  isAuthenticated() {
    return !!this.user;
  }

  logIn(email: string, password: string) {
    return this.af.auth.login({
      email,
      password
    });
  }

  logOut() {
    return this.af.auth.logout();
  }

  forgotPassword(email: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  updateName(name: string): Promise<any> {
    return this.user.updateProfile(name);
  }

  updateEmail(email: string): Promise<any> {
    return this.user.updateEmail(email);
  }

  updatePassword(newPassword: string): Promise<any> {
    return this.user.updatePassword(newPassword);
  }
}
