import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  DISPLAY_ALL, DISPLAY_UNWATCHED, DISPLAY_WATCHED,
  ORDER_NAME, ORDER_NEXT_EPISODE
} from './actions';

@Component({
  moduleId: module.id,
  selector: 'filter-selector',
  template: `
    <select #filterList (change)="filterChange.emit(filterList.value)">
      <option *ngFor="let filter of filters" value="{{filter.value}}">
        {{filter.name}}
      </option>
    </select>
    <div *ngFor="let order of orders">
       <input type="radio" name="showOrders" value="{{order.value}}" 
        (click)="orderChange.emit(order.value)" /> 
       {{order.name}}
    </div>
   
  `
})
export class FilterSelectorComponent implements OnInit {
  filters = [
    { name: 'all', value: DISPLAY_ALL },
    { name: 'watched', value: DISPLAY_WATCHED },
    { name: 'unwatched', value: DISPLAY_UNWATCHED }
  ];

  orders = [
    { name: 'name', value: ORDER_NAME },
    { name: 'next episode', value: ORDER_NEXT_EPISODE },
  ];

  @Output() filterChange = new EventEmitter();
  @Output() orderChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
