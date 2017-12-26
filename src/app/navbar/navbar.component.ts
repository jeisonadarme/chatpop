import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.currentUserObservable;
  }

  logout() {
    this.auth.signOut();
  }
}
