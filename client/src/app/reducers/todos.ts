import { ADD_TODO, DELETE_TODO, COMPLETE_TODO, LOAD_TODO, UNDO_TODO } from '../actions';
import { Show } from '../interfaces';

export const todos = (state: Show[] = [], { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return state.concat([Object.assign({}, { id: payload.id })]);
    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id);
    case COMPLETE_TODO:
      console.log(payload);
      return state.map((todo: Show) => {
        if (todo.id === payload.id) {
          return Object.assign({}, todo, {
            lastWatched: Date.now(),
            watchedEpisode: [payload.episode.airedSeason, payload.episode.airedEpisodeNumber],
            past: {
              lastWatched: todo.lastWatched,
              watchedEpisode: todo.watchedEpisode,
            }
          });
        }
        return todo;
      });
    case UNDO_TODO:
      return state.map(todo => {
        return todo.id === payload.id ?
          Object.assign({}, todo, { watchedEpisode: [0, 0] }, todo.past) : todo;
      });
    case LOAD_TODO:
      return payload;
    default:
      return state;
  }
};
