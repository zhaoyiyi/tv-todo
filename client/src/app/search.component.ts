import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';


import { ShowService } from './show.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  template: `
    Search <md-input placeholder="TV shows" #search
      (keyup)="searchTerm$.next(search.value)"></md-input>
      
    <md-nav-list 
      style="display: flex; flex-flow: column wrap; align-items: center;">
      <md-list-item class="search-result" style="width: 50%; text-align: center" 
        *ngFor="let show of results | async" #item
        (click)="onAdd(show)">
          {{show.seriesName}}
      </md-list-item>
    </md-nav-list>
  `,
  styles: [
    '.md-list-item { width: 100% }'
  ],
  directives: [MD_INPUT_DIRECTIVES, MD_LIST_DIRECTIVES]
})
export class SearchComponent implements OnInit {
  @Output() addShow = new EventEmitter();
  searchTerm$ = new Subject<string>();
  results = this.searchTerm$
    .debounceTime(500)
    .distinctUntilChanged()
    .map(term => term.length > 3 ? term : '')
    .switchMap(term => this.showService.search(term));

  constructor(
    private showService: ShowService,
    private el: ElementRef) {
  }

  ngOnInit() {

  }

  onAdd(show) {
    this.addShow.emit(show);
    // clear result list
    this.searchTerm$.next('');
    this.el.nativeElement.querySelector('input').value = '';
  }
}
