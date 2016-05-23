import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { ADD_TODO, DELETE_TODO, COMPLETE_TODO } from './actions';
import { ShowListComponent } from './show-list.component';
import { LoginComponent } from './login.component';
import { SearchComponent } from './search.component';
import { AuthService } from './auth.service';
import { ShowService } from './show.service';
import { Show } from './interfaces';
@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  template: `
    <h1>tv todo</h1>
    <login></login>
    <button (click)="onSave()">save</button>
    <search (addShow)="addShow($event)"></search>
    <show-list 
      [shows]="shows$ | async"
      (complete)="completeShow($event)"
      (remove)="deleteShow($event)">
    </show-list>
    <hr />
    {{ todos$ | async | json}}
  `,
  directives: [LoginComponent, ShowListComponent, SearchComponent],
  providers: [AuthService, ShowService]
})

export class TvtodoAppComponent implements OnInit {
  todos$: Observable<any>;
  shows$: Observable<any>;
  todos: Show[];
  constructor(
    private authService: AuthService,
    private showService: ShowService,
    private store: Store<any>) { }

  ngOnInit() {
    this.todos$ = this.store.select('todos').share();
    this.shows$ = this.todos$.mergeMap((todos: Show[]) => this.showService.getDetail(todos));
    this.todos$.subscribe(todos => this.todos = todos);
  }

  addShow(show) {
    this.store.dispatch({ type: ADD_TODO, payload: show });
  }

  completeShow(show) {
    this.store.dispatch({ type: COMPLETE_TODO, payload: show });
  }

  deleteShow(show) {
    this.store.dispatch({ type: DELETE_TODO, payload: show });
  }

  onSave() {
    console.log('saving user');
    this.authService.saveUser(this.todos)
      .subscribe(res => console.log(res));
  }
}
