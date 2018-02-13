import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from './../models/chat-message.model';

@Component({
  selector: 'app-content-media',
  templateUrl: './content-media.component.html',
  styleUrls: ['./content-media.component.css']
})

export class ContentMediaComponent implements OnInit {
 
  @Input() chatMessage: ChatMessage;

  urlContent: string;
  contentType: string;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.urlContent = chatMessage.urlContent;
    this.contentType = chatMessage.contentType;
  }

}
