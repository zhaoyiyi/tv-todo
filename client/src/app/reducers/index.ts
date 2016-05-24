import { todos } from './todos';
import { undoable } from './undoable';
import { order } from './order';
import { isWatched as watched, visibilityFilter } from './visibilityFilter';

export default {
  todos: undoable(todos),
  visibilityFilter,
  order
};

export const isWatched = watched;
