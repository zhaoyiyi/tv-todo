import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { ShowService } from './show.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  template: `
    <input type="text" #search
      (keyup)="searchTerm$.next(search.value)">
    <ul>
      <li *ngFor="let result of results | async">{{result.seriesName}}</li>
    </ul>
  `
})
export class SearchComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  results = this.searchTerm$
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(term => this.showService.search(term));

  constructor(private showService: ShowService) { }

  ngOnInit() {

  }
}
