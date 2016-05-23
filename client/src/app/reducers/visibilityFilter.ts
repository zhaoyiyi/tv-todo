import { ShowListItem } from '../interfaces';
import { DISPLAY_WATCHED, DISPLAY_UNWATCHED, DISPLAY_ALL } from '../actions';

export const isWatched = function isWathced(show: ShowListItem) {
  if (!show.todo || !show.todo.watchedEpisode) return false;

  return show.todo.watchedEpisode[0] >= show.episode.airedSeason
    && show.todo.watchedEpisode[1] >= show.episode.airedEpisodeNumber;
};

export const visibilityFilter = (state = show => true, {type, payload}) => {
  switch (type) {
    case DISPLAY_ALL:
      return show => true;
    case DISPLAY_WATCHED:
      return (show: ShowListItem) => isWatched(show);
    case DISPLAY_UNWATCHED:
      return (show: ShowListItem) => !isWatched(show);
    default:
      return state;
  }
};
