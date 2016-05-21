
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const todos = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return state.concat([Object.assign({}, payload)]);
    case DELETE_TODO:
      return;
    default:
      return state;
  }
};
