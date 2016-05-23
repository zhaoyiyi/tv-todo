import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, Subscriber } from 'rxjs/Rx';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { User, Show } from './interfaces';
declare var Auth0Lock;

@Injectable()
export class AuthService {
  user: User;
  private lock;

  constructor(private authHttp: AuthHttp) {
    const profile = localStorage.getItem('profile');
    const email = profile ? JSON.parse(profile).email : '';
    this.user = { email: email, shows: [] };
    this.lock = new Auth0Lock('TbKyzWIyAg79os6jasrmKOruN9VL5FYb', 'yizhao.auth0.com');
  }

  login(): Observable<string> {
    return Observable.create((subscriber: Subscriber<any>) => {
      this.lock.showSignin((err, profile, token) => {
        if (err) {
          subscriber.error(err);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
        this.user.email = profile.email;
        subscriber.next(profile.email);
        subscriber.complete();
      });
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.user = { email: '', shows: [] };
    localStorage.getItem('profile');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  getUser(email: string): Observable<User> {
    return this.authHttp.get(`/api/user/${email}`)
      .map(res => res.json());
  }

  saveUser(todos: Show[]): Observable<{ saved: boolean }> {
    this.user = Object.assign({}, this.user, {shows: todos});
    const options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json'})
    });
    console.log(this.user);
    return this.authHttp.post(`/api/user/save`, JSON.stringify(this.user), options)
      .map(res => res.json());
  }
}
