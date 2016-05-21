import { Component, OnInit } from '@angular/core';

import { ShowListComponent } from './show-list';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  template: `
    <h1>tv todo</h1>
    <login></login>
  `,
  directives: [LoginComponent, ShowListComponent],
  providers: [AuthService]
})

export class TvtodoAppComponent implements OnInit {
  title = 'tvtodo works!';

  constructor(
    private authService: AuthService) { }

  ngOnInit() {

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
