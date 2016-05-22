import { ADD_TODO, DELETE_TODO, COMPLETE_TODO } from './actions';
import { Show } from './interfaces';

export const todos = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return state.concat([Object.assign({}, payload)]);
    case DELETE_TODO:
      return;
    case COMPLETE_TODO:
      return state.map((todo: Show) => {
        if (todo.id == payload.id) {
          return Object.assign({}, todo, {lastWatched: Date.now()});
        }
        return todo;
      });
    default:
      return state;
  }
};
