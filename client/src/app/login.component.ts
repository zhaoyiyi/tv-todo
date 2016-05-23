import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LOAD_TODO } from './actions';
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

  constructor(
    private authService: AuthService,
    private store: Store<any>) {

  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.email = this.authService.user.email;
      this.loadUser();
    }
  }

  login() {
    this.authService.login()
      .subscribe(
        email => this.email = email,
        err => console.log(err),
        () => this.loadUser()
      );
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  loadUser() {
    this.authService.getUser().subscribe(user => {
      const todos = user.shows;
      this.store.dispatch({ type: LOAD_TODO, payload: todos });
    });
  }

}
