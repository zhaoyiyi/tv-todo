import { Component, OnInit } from '@angular/core';
import { AuthHttp, tokenNotExpired } from "angular2-jwt/angular2-jwt";
declare var Auth0Lock;

@Component({
  moduleId: module.id,
  selector: 'login',
  template: `
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
  `
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  lock = new Auth0Lock('TbKyzWIyAg79os6jasrmKOruN9VL5FYb', 'yizhao.auth0.com');

  login() {
    this.lock.show();
    var hash = this.lock.parseHash();
    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.lock.getProfile(hash.id_token, function (err, profile) {
          if (err) {
            console.log(err);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', hash.id_token);
        });
    }
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
