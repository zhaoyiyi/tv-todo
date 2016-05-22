import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { Store, provideStore } from '@ngrx/store';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { TvtodoAppComponent, environment } from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(TvtodoAppComponent, [
  HTTP_PROVIDERS,
  AUTH_PROVIDERS
]);
