import { ChatMessage } from './../models/chat-message.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import 'rxjs/add/operator/take';

@Injectable()
export class ChatService {
  user: any;
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  mineAbove: boolean = false;

  constructor(public db: AngularFirestore, public auth: AuthService) {
    this.user = auth.currentUser;
  }

  sendMessage(msg: string){
    this.getLastMessage().subscribe(val => {
      const timestamp = this.getTimeStamp();
      this.chatMessages = this.getCollection();
      console.log(val, this.auth.currentUser.email);
      if(val[0] && this.auth.currentUser.email === val[0].email) this.mineAbove = true;
        else this.mineAbove = false;
      this.chatMessages.add({
        message: msg,
        timeSent: new Date(),
        userName: this.auth.currentUserDisplayName,
        email: this.auth.authState.email,
        mineAbove: this.mineAbove
      });
    });
    console.log("send message");
  }

  get getMessages(): Observable<ChatMessage[]>{
    return this.getCollection().snapshotChanges()
      .map(messages => {
        return messages.map(msg => {
          const data = msg.payload.doc.data() as ChatMessage;
          const id = msg.payload.doc.id;
          return {
            id, 
            message: data.message,
            email: data.email,
            timeSent: data.timeSent,
            userName: data.userName,
            mineAbove: data.mineAbove
          }
        })
      });
  }
  
  getLastMessage(): Observable<any> {
    var collection = this.db.collection<ChatMessage>("messages", ref => ref.orderBy("timeSent", "desc").limit(1));  
    return collection.snapshotChanges()
      .map(messages => {
        return messages.map(msg => {
          const data = msg.payload.doc.data() as ChatMessage;
          const id = msg.payload.doc.id;
          return {
            id, 
            message: data.message,
            email: data.email,
            timeSent: data.timeSent,
            userName: data.userName,
            mineAbove: data.mineAbove
          }
        })
      }).take(1);
  }

  private getTimeStamp() {
      const now = new Date();
      const date = `${now.getFullYear()}/${now.getUTCMonth() + 1}/${now.getUTCDate}`;
      const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds}`;

      return (`${date} ${time}`);
  }

  private getCollection(): AngularFirestoreCollection<ChatMessage> {
    return this.db
      .collection<ChatMessage>("messages", ref => ref.orderBy("timeSent", "asc").limit(15));   
  }
}
