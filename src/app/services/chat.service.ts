import { Chat } from './../models/chat.model';
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

  chatCollection: AngularFirestoreCollection<Chat>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  mineAbove: boolean = false;

  constructor(public db: AngularFirestore, public auth: AuthService) {
    this.user = auth.currentUser;
  }

  getChat(idOne: string, idTwo: string): Promise<any> {
    //take just a few characters of the user ids
    let compouseId = idOne.substring(0, 7) + idTwo.substring(0, 7);
    // do a reference to the document
    let chatRef = this.db.collection('chats').doc(compouseId);
    //get the document
    return chatRef.ref.get()
      .then((docSnapshot) => {
        //if exist return de id
        if (docSnapshot.exists) {
          return { id: compouseId } as Chat;
        } else { // swap the id and search
          compouseId = idTwo.substring(0, 7) + idOne.substring(0, 7);
          // do a reference to the document
          const usersRef2 = this.db.collection('chats').doc(compouseId);
          return usersRef2.ref.get()
            .then((docSnapshot) => {
              //if exist return de id
              if (docSnapshot.exists) {
                return { id: compouseId } as Chat;
              } else { // create the chat if not exist
                this.db.collection('chats').doc(compouseId).set({ id: compouseId })
                return  { id: compouseId } as Chat;
              }
            });
        }
      }).catch(err => console.log(err));
  }

  sendMessage(msg: string, chatId: string) {
    this.getLastMessage(chatId).subscribe(val => {
      const timestamp = this.getTimeStamp();
      this.chatMessages = this.db.collection("chats").doc(chatId).collection("messages");
      if (val[0] && this.auth.currentUser.email === val[0].email) this.mineAbove = true;
      else this.mineAbove = false;
      this.chatMessages.add({
        message: msg,
        timeSent: new Date(),
        userName: this.auth.currentUserDisplayName,
        email: this.auth.authState.email,
        mineAbove: this.mineAbove,
        hasMedia: false
      });
    });
  }

  sendMedia(url: string, contentType: string, size: number, chatId: string) {
    this.getLastMessage(chatId).subscribe(val => {
      const timestamp = this.getTimeStamp();
      this.chatMessages = this.db.collection("chats").doc(chatId).collection("messages");
      if (val[0] && this.auth.currentUser.email === val[0].email) this.mineAbove = true;
      else this.mineAbove = false;
      this.chatMessages.add({
        message: "",
        urlContent: url,
        contentType: contentType,
        timeSent: new Date(),
        userName: this.auth.currentUserDisplayName,
        email: this.auth.authState.email,
        mineAbove: this.mineAbove,
        size: size,
        hasMedia: true
      });
    });
  }

  getMessages(chatId: string): Observable<ChatMessage[]> {
    return this.db.collection("chats").doc(chatId).collection("messages", ref => ref.orderBy("timeSent", "asc")).snapshotChanges()
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
            mineAbove: data.mineAbove,
            hasMedia: data.hasMedia,
            urlContent: data.urlContent,
            contentType: data.contentType
          }
        })
      });
  }

  getLastMessage(chatId: string): Observable<any> {
    var collection = this.db.collection<Chat>("chats").doc(chatId).collection<ChatMessage>("messages", ref => ref.orderBy("timeSent", "desc").limit(1));
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
