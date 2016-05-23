import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Show, DetailResult, Episode } from './interfaces';

@Component({
  moduleId: module.id,
  selector: 'show-list',
  templateUrl: 'show-list.component.html'
})
export class ShowListComponent {
  @Input() shows: Array<{ todo: Show, detail: DetailResult, episode: Episode }>;
  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();

}
