import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SearchResult, DetailResult, Episode } from './interfaces';

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
