import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton, MdAnchor } from '@angular2-material/button';
import { MdIcon } from '@angular2-material/icon';

import { ShowListItem } from './interfaces';



@Component({
  moduleId: module.id,
  selector: 'show-list',
  templateUrl: 'show-list.component.html',
  styleUrls: ['show-list.component.css'],
  directives: [MD_CARD_DIRECTIVES, MdButton, MdIcon, MdAnchor]
})
export class ShowListComponent {
  @Input() shows: Array<ShowListItem>;
  @Input() isWatched: Function;

  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();
  @Output() unComplete = new EventEmitter();

}
