import { ChatMessage } from './../models/chat-message.model';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './../services/chat.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<any[]> = null;;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.feed = this.chat.getMessages;
  }

  ngOnChanges(){
    this.feed = this.chat.getMessages;
  }
}
