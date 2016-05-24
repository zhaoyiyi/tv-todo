import { ORDER_NAME, ORDER_NEXT_EPISODE } from '../actions';
import * as moment from 'moment';
import { ShowListItem } from '../interfaces';
export const order = (state = todos => todos, { type, payload}) => {
  switch (type) {
    case ORDER_NAME:
      return (todos: ShowListItem[]) => [...todos].sort((a, b) => {
        return a.detail.seriesName.localeCompare(b.detail.seriesName);
      });

    case ORDER_NEXT_EPISODE:
      return (todos: ShowListItem[]) => [...todos].sort((a, b) => {
        const aTime = a.episode.nextEpisode ? a.episode.nextEpisode.firstAired : '2099-12-31';
        const bTime = b.episode.nextEpisode ? b.episode.nextEpisode.firstAired : '2099-12-31';

        return moment(aTime).diff(moment(bTime));
      });
    default:
      return state;
  }
};

