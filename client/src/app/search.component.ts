import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { ShowService } from './show.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  template: `
    <input type="text" #search
      (keyup)="searchTerm$.next(search.value)">
    <ul>
      <li *ngFor="let show of results | async">
        {{show.seriesName}}
        <button (click)="addShow.emit(show)">add</button>
      </li>
    </ul>
  `
})
export class SearchComponent implements OnInit {
  @Output() addShow = new EventEmitter();
  searchTerm$ = new Subject<string>();
  results = this.searchTerm$
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(term => this.showService.search(term));

  constructor(
    private showService: ShowService) {
  }

  ngOnInit() {

  }
}
