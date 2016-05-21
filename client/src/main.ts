import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { TvtodoAppComponent, environment } from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(TvtodoAppComponent);
