import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Show, DetailResult, Episode } from './interfaces';

interface ShowListItem {
  todo: Show;
  detail: DetailResult;
  episode: Episode;
}

@Component({
  moduleId: module.id,
  selector: 'show-list',
  templateUrl: 'show-list.component.html'
})
export class ShowListComponent {
  @Input() shows: Array<ShowListItem>;
  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();
  @Output() unComplete = new EventEmitter();

  isWatched(show: ShowListItem) {
    return show.todo.watchedEpisode[0] >= show.episode.airedSeason
      && show.todo.watchedEpisode[1] >= show.episode.airedEpisodeNumber;
  }
}
