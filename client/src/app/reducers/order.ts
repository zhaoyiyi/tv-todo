import { ORDER_NAME, ORDER_NEXT_EPISODE } from '../actions';
import { ShowListItem } from '../interfaces';
export const order = (state = todos => todos, { type, payload}) => {
  switch (type) {
    case ORDER_NAME:
      return (todos: ShowListItem[]) => {
        console.log(todos);
        return [...todos].sort((a, b) => {
          return a.detail.seriesName.localeCompare(b.detail.seriesName);
        });
      };
    case ORDER_NEXT_EPISODE:
      return (todos: ShowListItem[]) => [...todos].sort((a, b) => {
        return a.episode.absoluteNumber - b.episode.absoluteNumber;
      });
    default:
      return state;
  }
};

