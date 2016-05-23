import { todos } from './todos';
import { undoable } from './undoable';

export default {
  todos: undoable(todos)
};
