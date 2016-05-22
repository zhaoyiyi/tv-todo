import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

interface SearchResult {
  id: number;
  aliases: string[];
  banner: string;
  overview: string;
  seriesName: string;
  status: string;
}

interface DetailResult extends SearchResult {
  genre: string[];
  airsDayOfWeek: string;
  airsTime: string;
  network: string;
  runtime: string;
}

interface Episode {
  airedEpisodeNumber: number;
  airedSeason: number;
  episodeName: string;
  firstAired: string;
  id: number;
  overview: string;
  nextEpisode?: Episode;
}

@Injectable()
export class ShowService {

  constructor(private http: Http) { }

  search(word: string): Observable<SearchResult[]> {
    return this.http.get(`/api/tvdb/${word}`)
      .map(res => res.json());
  }

  detail(id: string): Observable<DetailResult[]> {
    return this.http.get(`/api/tvdb/detail/${id}`)
      .map(res => res.json());
  }

  newestEpisode(id: string): Observable<Episode> {
    return this.http.get(`/api/tvdb/newestEpisode/${id}`)
      .map(res => res.json());
  }
}
