import { User } from './../models/user.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

@Injectable()
export class UsersService {
  private usersCollection: AngularFirestoreCollection<User>;
//, public authUser: AuthService
  constructor(public afs: AngularFirestore) { }

  getCurrentUsers(uid?: string): Observable<User[]> {
    this.usersCollection = this.afs.collection<User>('users', ref => ref.orderBy("status", "desc"));
    return this.usersCollection.snapshotChanges()
    .map(users => {
      return users.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return  {
                    id,
                    userName: data.userName,
                    email: data.email, 
                    status: data.status
                };
      }).filter(a => (uid ? a.id !== uid : a.id)); 
    });
  }

  getUser(uid: string): Observable<User> {
    return this.afs.collection("users").doc(uid).snapshotChanges()
      .map(user => {
        const data = user.payload.data() as User;
        const id = user.payload.id;
        return {
                  id,
                  userName: data.userName,
                  email: data.email, 
                  status: data.status
              }
      })
  }
}
