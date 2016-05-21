import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  template: `
    <button *ngIf="!isLoggedIn()" (click)="login()">Login</button>
    <button *ngIf="isLoggedIn()" (click)="logout()">Logout</button>
    <p>{{email}}</p>
  `
})

export class LoginComponent implements OnInit {
  email: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.email = this.authService.user.email;
    }
  }


  login() {
    this.authService.login()
      .subscribe(
        email => this.email = email,
        err => console.log(err)
      );
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
