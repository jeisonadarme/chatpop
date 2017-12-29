import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.emailLogin(this.email, this.password)
    .then(resolve => this.router.navigate(['chat']))
    .catch(error => this.errorMsg = error.message);
  }

}
