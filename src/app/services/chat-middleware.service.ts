import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class ChatMiddlewareService {

  private userId = new BehaviorSubject<string>("general");
  currentUserId = this.userId.asObservable();
  private chatId = new BehaviorSubject<string>("general");
  currentChatId = this.chatId.asObservable();

  constructor() { }

  changeUserId(userId: string){
    this.userId.next(userId);
  }

  changeChatId(chatId: string){
    this.chatId.next(chatId);
  }
}
