import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SearchResult, DetailResult, Episode, Show } from './interfaces';

@Injectable()
export class ShowService {
  private shows: {
    detail: DetailResult[];
    newestEpisode: Episode[];
  };

  constructor(private http: Http) {
    this.shows = {
      detail: [], newestEpisode: []
    };
  }

  search(word: string): Observable<SearchResult[]> {
    if (!word) return Observable.of([]);

    return this.http.get(`/api/tvdb/${word}`)
      .map(res => res.json());
  }

  getDetail(todos: Show[]) {
    if (!todos) return Observable.of([]);
    return Observable.from(todos)
      .filter((todo) => todo.id ? true : false)
      .mergeMap((todo) => {
        return Observable.zip(
          this.detail(todo.id),
          this.newestEpisode(todo.id),
          (detail, episode) => ({ id: todo.id, todo, detail, episode }));
      })
      .toArray();
  }

  private detail(id: string): Observable<DetailResult[]> {
    if (this.shows.detail[id]) {
      return Observable.of(this.shows.detail[id]);
    }

    return this.http.get(`/api/tvdb/detail/${id}`)
      .map(res => {
        this.shows.detail[id] = res.json();
        return res.json();
      });
  }

  private newestEpisode(id: string): Observable<Episode> {
    if (this.shows.newestEpisode[id]) {
      return Observable.of(this.shows.newestEpisode[id]);
    }
    return this.http.get(`/api/tvdb/newestEpisode/${id}`)
      .map(res => {
        this.shows.newestEpisode[id] = res.json();
        return res.json();
      });
  }
}
