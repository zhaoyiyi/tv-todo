import { bootstrap } from "@angular/platform-browser-dynamic";
import { HTTP_PROVIDERS } from "@angular/http";
import { enableProdMode } from "@angular/core";
import { provideStore } from "@ngrx/store";
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";
import { MdIconRegistry } from "@angular2-material/icon";
import { MATERIAL_PROVIDERS } from "ng2-material";
import { TvtodoAppComponent, environment } from "./app";
import reducers from "./app/reducers/index";

if (environment.production) {
  enableProdMode();
}

bootstrap(TvtodoAppComponent, [
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  MATERIAL_PROVIDERS,
  MdIconRegistry,
  provideStore(reducers)
]);
