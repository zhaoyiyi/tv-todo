import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Show, DetailResult, Episode } from './interfaces';

@Component({
  moduleId: module.id,
  selector: 'show-list',
  template: `
    <li *ngFor="let show of shows">
      <img src="http://thetvdb.com/banners/{{show.detail.banner}}" />
      <p>{{show.detail.seriesName}}, episode: {{show.episode.airedEpisodeNumber}}
        watched: {{show.episode.absoluteNumber === show.todo.watchedEpisode}}
        <button (click)="remove.emit(show)">remove</button>
        <button (click)="complete.emit(show)">complete</button>
      </p>
    </li>
  `
})
export class ShowListComponent {
  @Input() shows: Array<{ todo: Show, detail: DetailResult, episode: Episode }>;
  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();

}
