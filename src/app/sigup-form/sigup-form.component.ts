import { ChatFormComponent } from './../chat-form/chat-form.component';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sigup-form',
  templateUrl: './sigup-form.component.html',
  styleUrls: ['./sigup-form.component.css']
})
export class SigupFormComponent {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router ) { }

  sigUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;

    this.authService.emailSignUp(email, password, displayName)
    .then(resolve => this.router.navigate(['chat']))
    .catch(err => { 
      this.errorMsg = err.message;
      console.log(err);
    })
  }
}
