import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdButton, MdAnchor } from '@angular2-material/button';

import { LOAD_TODO } from './actions';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  template: `
    <md-toolbar color="primary">
      <span style="flex: 1; text-align: right">
        <span *ngIf="email">Hello {{email}}</span>
        <span *ngIf="!email">Please login</span>
        <button md-raised-button color="warn" 
          *ngIf="!isLoggedIn()" (click)="login()">Login</button>
        <button md-raised-button color="warn" 
          *ngIf="isLoggedIn()" (click)="logout()">Logout</button>  
      </span>
    </md-toolbar>
  `,
  directives: [MdToolbar, MdButton]
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
    this.email = '';
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  loadUser() {
    this.authService.getUser().subscribe(user => {
      console.log(user);
      const todos = (user && user.shows) || [];
      this.store.dispatch({ type: LOAD_TODO, payload: todos });
    });
  }

}
