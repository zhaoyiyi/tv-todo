import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  template: `
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
  `
})

export class LoginComponent implements OnInit {

  constructor(private loginService: AuthService) {
  }

  ngOnInit() {
  }


  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

  loggedIn() {
    return this.loginService.isLoggedIn();
  }

}
