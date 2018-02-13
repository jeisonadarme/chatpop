import { ChatMessage } from './../models/chat-message.model';
import { AuthService } from './../services/auth.service';
import { ChatService } from './../services/chat.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  currentEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  mineAbove: boolean = false;
  urlContent: string = "";
  contentType: string = "";
  hasMedia: boolean;
  // isOwnMessage: boolean
  constructor(public auth: AuthService) { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.currentEmail = this.auth.currentUser.email;
    this.mineAbove = chatMessage.mineAbove;
    this.hasMedia = chatMessage.hasMedia;
    if(this.hasMedia){
      this.contentType = chatMessage.contentType;
      this.urlContent = chatMessage.urlContent;
    }
  }

  getClass() {
    let margin: string;
    if(!this.mineAbove){
      if(this.userEmail === this.auth.currentUser.email) margin = "message-above-out";
      else margin = "message-above-in";
    }

    if(this.userEmail === this.auth.currentUser.email) {
      return "messague-out " + margin;
    }
    else{ 
      return "messague-in " + margin;
    };
  }

  getClassTail() {
    if(this.userEmail === this.auth.currentUser.email) return "tail-container-out";
      else return "tail-container-in";
  }

  getContentClass(){
    return this.hasMedia ? "messageContentMedia" : "messageContent";
  }
}
