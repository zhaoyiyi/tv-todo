import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DISPLAY_ALL, DISPLAY_UNWATCHED, DISPLAY_WATCHED} from './actions';

@Component({
  moduleId: module.id,
  selector: 'filter-selector',
  template: `
    <select #filterList (change)="filterChange.emit(filterList.value)">
      <option *ngFor="let filter of filters" value="{{filter.value}}">
        {{filter.name}}
      </option>
    </select>
  `
})
export class FilterSelectorComponent implements OnInit {
  filters = [
    { name: 'all', value: DISPLAY_ALL },
    { name: 'watched', value: DISPLAY_WATCHED },
    { name: 'unwatched', value: DISPLAY_UNWATCHED }
  ];

  @Output() filterChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
