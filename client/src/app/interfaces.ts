export interface Show {
  id: string;
  lastWatched: number;
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
  airedEpisodeNumber: number;
  airedSeason: number;
  episodeName: string;
  firstAired: string;
  id: number;
  overview: string;
  nextEpisode?: Episode;
}