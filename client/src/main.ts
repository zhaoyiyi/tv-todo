import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { TvtodoAppComponent, environment } from './app';
import { todos } from './app/todos';

if (environment.production) {
  enableProdMode();
}

bootstrap(TvtodoAppComponent, [
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  provideStore({todos})
]);
