import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Show } from './interfaces';

@Component({
  moduleId: module.id,
  selector: 'show-list',
  template: `
    <li *ngFor="let show of shows">
      {{show | json}}
      <button (click)="remove.emit(show)">remove</button>
      <button (click)="complete.emit(show)">complete</button>
    </li>
  `
})
export class ShowListComponent {
  @Input() shows: Show[];
  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();

}
