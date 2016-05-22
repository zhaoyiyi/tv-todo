import { Component, OnInit } from '@angular/core';

import { ShowListComponent } from './show-list';
import { LoginComponent } from './login.component';
import { SearchComponent } from './search.component';
import { AuthService } from './auth.service';
import { ShowService } from './show.service';
@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  template: `
    <h1>tv todo</h1>
    <login></login>
    <search></search>
  `,
  directives: [LoginComponent, ShowListComponent, SearchComponent],
  providers: [AuthService, ShowService]
})

export class TvtodoAppComponent implements OnInit {
  title = 'tvtodo works!';

  constructor(
    private authService: AuthService,
    private showSerivce: ShowService) { }

  ngOnInit() {
    this.showSerivce.search('sakamoto')
      .subscribe(data => console.log(data));

    if (this.authService.isLoggedIn()) {
      this.authService.getUser('test@test.com')
        .subscribe(data => console.log(data));
    }
  }
}
