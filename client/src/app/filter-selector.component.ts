import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MdRadioButton, MdRadioGroup } from "@angular2-material/radio/radio";
import { MdRadioDispatcher } from "@angular2-material/radio/radio_dispatcher";
import {
  DISPLAY_ALL,
  DISPLAY_UNWATCHED,
  DISPLAY_WATCHED,
  ORDER_NAME,
  ORDER_NEXT_EPISODE
} from "./actions";

@Component({
  moduleId: module.id,
  selector: 'filter-selector',
  template: `
    Display: <select class="ui dropdown" #filterList
        (change)="filterChange.emit(filterList.value)">
      <option *ngFor="let filter of filters" value="{{filter.value}}">
        {{filter.name}}
      </option>
    </select>
    
    Sort by: <md-radio-button name="showOrders" *ngFor="let order of orders" style="margin: 8px"
      value="{{order.value}}" 
      (click)="orderChange.emit(order.value)">
        {{order.name}}
    </md-radio-button>
  `,
  providers: [MdRadioDispatcher],
  directives: [MdRadioButton, MdRadioGroup]
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

  constructor() {
  }

  ngOnInit() {
  }

}
