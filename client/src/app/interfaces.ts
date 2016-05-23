import {Reducer} from '@ngrx/store';

export interface Show {
  id: string;
  lastWatched: number;
  watchedEpisode: number;
  past: {
    lastWatched?: number;
    watchedEpisode?: number;
  };
};

export interface User {
  email: string;
  id?: string;
  shows?: Show[];
}

export interface SearchResult {
  id: number;
  aliases: string[];
  banner: string;
  overview: string;
  seriesName: string;
  status: string;
}

export interface DetailResult extends SearchResult {
  genre: string[];
  airsDayOfWeek: string;
  airsTime: string;
  network: string;
  runtime: string;
}

export interface Episode {
  absoluteNumber: number;
  airedEpisodeNumber: number;
  airedSeason: number;
  episodeName: string;
  firstAired: string;
  id: number;
  overview: string;
  nextEpisode?: Episode;
}

export interface UndoableState {
  past: any[];
  present: Reducer<any>;
  future: any[];
}

export interface Undoable {
  past: any[];
  present: any[];
  future: any[];
}

export interface ShowListItem {
  todo: Show;
  detail: DetailResult;
  episode: Episode;
}
