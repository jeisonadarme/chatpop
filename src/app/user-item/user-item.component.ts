import { User } from './../models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { ChatMiddlewareService } from './../services/chat-middleware.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  selected: string;

  constructor(private chatMiddlewareService: ChatMiddlewareService) { }

  ngOnInit() {
  }

  updateFeed(userId: string) {
    this.selected = userId;
    this.chatMiddlewareService.changeUserId(userId);
  };

  isActive(userId: string) {
    return this.selected === userId;
  };
}
