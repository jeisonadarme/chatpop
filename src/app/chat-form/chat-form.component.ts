import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ChatMiddlewareService } from './../services/chat-middleware.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  currentChatId: string;

  constructor(public chat: ChatService, private chatMiddlewareService: ChatMiddlewareService) { }

  ngOnInit() {
    this.chatMiddlewareService.currentChatId.subscribe(id => this.currentChatId = id);
  }

  send(){
    this.chat.sendMessage(this.message, this.currentChatId);
    this.message = "";
  }

  handleSubmit(event){
    if(event.keyCode === 13){
      this.send();
    }
  }
}
