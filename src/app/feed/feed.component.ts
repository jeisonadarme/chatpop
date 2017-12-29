import { AuthService } from './../services/auth.service';
import { ChatMiddlewareService } from './../services/chat-middleware.service';
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
  feed: Observable<ChatMessage[]> = null;;
  userId: string;

  constructor(private chat: ChatService, private chatMiddlewareService: ChatMiddlewareService, private authService: AuthService) { }

  ngOnInit() {
    //activates when a user in the list is select
    this.chatMiddlewareService.currentUserId.subscribe(userId => {
      this.userId = userId;
      if (userId === "general") {
        //get the chat id to show the feed
        this.chat.getChat(this.userId, "").then(chat => {
          //get the feed with the chat id
          this.feed = this.chat.getMessages(chat.id);
          this.chatMiddlewareService.changeChatId(chat.id);
        });
      } else {
        //get the chat id to show the feed
        this.chat.getChat(this.userId, this.authService.currentUserId).then(chat => {
          //get the feed with the chat id
          this.feed = this.chat.getMessages(chat.id);
          this.chatMiddlewareService.changeChatId(chat.id);
        });
      }
    });
  }

  ngOnChanges() {
  }
}
