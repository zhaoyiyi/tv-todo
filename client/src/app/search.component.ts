import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { ShowService } from './show.service';
import { ADD_TODO } from './actions';

@Component({
  moduleId: module.id,
  selector: 'search',
  template: `
    <input type="text" #search
      (keyup)="searchTerm$.next(search.value)">
    <ul>
      <li *ngFor="let show of results | async">
        {{show.seriesName}}
        <button (click)="addShow(show)">add</button>
      </li>
    </ul>
    {{todos | async | json}}
  `
})
export class SearchComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  todos;
  results = this.searchTerm$
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(term => this.showService.search(term));

  constructor(
    private showService: ShowService,
    private store: Store<any>) {
    this.todos = store.select('todos');
  }

  ngOnInit() {

  }

  addShow(show) {
    this.store.dispatch({ type: ADD_TODO, payload: show });
  }
}
