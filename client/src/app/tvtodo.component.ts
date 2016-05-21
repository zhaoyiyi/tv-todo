import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { LoginComponent } from './+login';
import { LoginService } from "./login.service";

@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  template: `
    <h1>tv todo</h1>
    <router-outlet></router-outlet>
  `,
  directives: [LoginComponent, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, LoginService]
})
@Routes([
  { path: '/login', component: LoginComponent }
])
export class TvtodoAppComponent implements OnInit {
  title = 'tvtodo works!';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
