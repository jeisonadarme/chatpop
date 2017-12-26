import { UsersService } from './users.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  authState: any = null;
  displayName: string = null;
  user: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private userService: UsersService) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      if(auth){
        console.log("oooo");
        userService.getUser(auth.uid).subscribe(resolver => {
          this.user = resolver;
          console.log(resolver);
          this.authState['userName'] = this.user.userName;
          console.log(this.authState);
        });
      }
    });
  }

  //Get firestore user
  firestoreUser(): any {
    return this.user;
  }

  firestoreUserObservable(): Observable<any> {
    return this.user;
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser():  any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): Observable<any> {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    console.log(this.user);
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.user.userName || this.authState['displayName'] || 'User without a Name' }
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.displayName = displayName;
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserDataLogin()
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
  }

  //// Helpers ////
  private updateUserData(): void {
    console.log(this.currentUserId);
    let data = {
      email: this.authState.email,
      userName: this.displayName,
      status: 'online'
    }

    this.db.collection('users').doc(this.currentUserId).set(data);
  }

  private updateUserDataLogin(): void {
    console.log(this.currentUserId);
    let data = {
      email: this.authState.email,
      status: 'online'
    }

    this.db.collection('users').doc(this.currentUserId).update(data);
  }
}
