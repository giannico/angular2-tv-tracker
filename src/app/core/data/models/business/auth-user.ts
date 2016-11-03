import { User } from 'firebase';

export class AuthUser {

  constructor(private firebaseUser: User) {}

  get uid(): string {
    return this.firebaseUser.uid;
  }

  get name(): string {
    return this.firebaseUser.displayName;
  }

  get email(): string {
    return this.firebaseUser.email;
  }

  updateProfile(name: string): Promise<any> {
    return this.firebaseUser.updateProfile({
      displayName: name,
      photoURL: null
    });
  }

  updateEmail(email: string): Promise<any> {
    return this.firebaseUser.updateEmail(email);
  }

  updatePassword(newPassword: string): Promise<any> {
    return this.firebaseUser.updatePassword(newPassword);
  }
}
