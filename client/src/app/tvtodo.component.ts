import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { MdButton, MdAnchor } from '@angular2-material/button';

import { ADD_TODO, DELETE_TODO, COMPLETE_TODO, UNDO_TODO, UNDO, REDO } from './actions';
import { isWatched } from './reducers/index';
import { ShowListComponent } from './show-list.component';
import { LoginComponent } from './login.component';
import { SearchComponent } from './search.component';
import { FilterSelectorComponent } from './filter-selector.component';
import { AuthService } from './auth.service';
import { ShowService } from './show.service';
import { Show, Undoable, ShowListItem} from './interfaces';
@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  templateUrl: 'tvtodo.component.html',
  directives: [
    LoginComponent, ShowListComponent, SearchComponent,
    FilterSelectorComponent, MdButton
  ],
  providers: [AuthService, ShowService]
})

export class TvtodoAppComponent implements OnInit {
  todos$: Observable<any>;
  todos: Show[];
  isWatched = isWatched;
  constructor(
    private authService: AuthService,
    private showService: ShowService,
    private store: Store<any>) { }

  ngOnInit() {
    this.todos$ = Observable.combineLatest(
      this.store.select<Undoable>('todos')
        .pluck('present')
        .mergeMap((todos: Show[]) => this.showService.getDetail(todos)),
      this.store.select('visibilityFilter'),
      this.store.select('order'),
      (todos: ShowListItem[], visibilityFilter, order) => {
        console.log(todos);
        return order(todos).filter(visibilityFilter);
      }).share();

    this.todos$
      .map((todos: ShowListItem[]) => todos.map(item => item.todo))
      .subscribe((todos: Show[]) => this.todos = todos);
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

  onFilterChange(filterName) {
    this.store.dispatch({ type: filterName });
  }
  onOrderChange(order) {
    this.store.dispatch({ type: order });
  }

  onSave() {
    console.log('saving user');
    this.authService.saveUser(this.todos)
      .subscribe(res => console.log(res));
  }

  unComplete(show) {
    this.store.dispatch({ type: UNDO_TODO, payload: show });
  }

  undo() {
    this.store.dispatch({ type: UNDO });
  }

  redo() {
    this.store.dispatch({ type: REDO });
  }
  
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
