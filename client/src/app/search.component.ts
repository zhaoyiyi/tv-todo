import { Component, OnInit } from '@angular/core';
import { ShowService } from './show.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  template: `
    <input type="text" [(ngModel)]="searchText">
  `
})
export class SearchComponent implements OnInit {
  searchText: string;

  constructor( private showService: ShowService) { }

  ngOnInit() { }

}
