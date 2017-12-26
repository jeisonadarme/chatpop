import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(private userService: UsersService, public auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUserObservable.subscribe(user => {
      console.log("this is important dude", user);
      this.users = this.userService.getCurrentUsers(user.uid);
    })
  }

}
