import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt/angular2-jwt';
declare var Auth0Lock;

@Injectable()
export class AuthService {
  user: {email: string, shows: Array<any>};
  private lock;

  constructor() {
    const email = localStorage.getItem('profile') ? localStorage.getItem('profile').email : '';
    this.user = { email: email, shows: [] };
    this.lock = new Auth0Lock('TbKyzWIyAg79os6jasrmKOruN9VL5FYb', 'yizhao.auth0.com');
  }

  login() {
    this.lock.showSignin((err, profile, token) => {
      if (err) return console.log(err);
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.user.email = profile.email;
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.user = { email: '', shows: [] };
  }

  isLoggedIn() {
    return tokenNotExpired();
  }
}
