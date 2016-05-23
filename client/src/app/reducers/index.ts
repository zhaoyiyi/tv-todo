import { todos } from './todos';
import { undoable } from './undoable';
import { isWatched as watched, visibilityFilter } from './visibilityFilter';

export default {
  todos: undoable(todos),
  visibilityFilter
};

export const isWatched = watched;
