import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Rx";
import { MdButton } from "@angular2-material/button";
import { MdToolbar } from "@angular2-material/toolbar/toolbar";
import { MdIcon } from "@angular2-material/icon";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { ADD_TODO, DELETE_TODO, COMPLETE_TODO, UNDO_TODO, UNDO, REDO } from "./actions";
import { isWatched } from "./reducers/index";
import { ShowListComponent } from "./show-list.component";
import { LoginComponent } from "./login.component";
import { SearchComponent } from "./search.component";
import { FilterSelectorComponent } from "./filter-selector.component";
import { AuthService } from "./auth.service";
import { ShowService } from "./show.service";
import { Show, Undoable, ShowListItem } from "./interfaces";

@Component({
  moduleId: module.id,
  selector: 'tvtodo-app',
  templateUrl: 'tvtodo.component.html',
  styleUrls: ['tvtodo.component.css'],
  directives: [
    LoginComponent, ShowListComponent, SearchComponent,
    FilterSelectorComponent, MdButton, MdToolbar, MdIcon
  ],
  providers: [AuthService, ShowService, ToastsManager]
})

export class TvtodoAppComponent implements OnInit {
  todos$: Observable<any>;
  shows$: Observable<any>;
  todos: Show[];
  isWatched = isWatched;

  constructor(private authService: AuthService,
              private showService: ShowService,
              private toastr: ToastsManager,
              private store: Store<any>) {
  }

  ngOnInit() {
    this.todos$ = Observable.combineLatest(
      this.store.select<Undoable>('todos')
        .pluck('present')
        .mergeMap((todos: Show[]) => this.showService.getDetail(todos)),
      this.store.select('order'),
      (todos: ShowListItem[], order) => {
        return order(todos);
      }).share();

    this.shows$ = Observable.combineLatest(
      this.todos$,
      this.store.select('visibilityFilter'),
      (todos, visibilityFilter) => {
        return todos.filter(visibilityFilter);
      }
    );

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
      .subscribe(res => {
        if (res.saved) {
          this.toastr.success('List Saved');
        } else {
          this.toastr.warning('Fail to save list');
        }
      });
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
