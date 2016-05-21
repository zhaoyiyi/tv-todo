import { Component } from '@angular/core';

import { LoginComponent } from './login';

@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  template: `
    <h1>tv todo</h1>
    <login></login>
  `,
  directives: [LoginComponent]
})
export class TvtodoAppComponent {
  title = 'tvtodo works!';
}
