import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';

import { Show, DetailResult, Episode } from './interfaces';

interface ShowListItem {
  todo: Show;
  detail: DetailResult;
  episode: Episode;
}

@Component({
  moduleId: module.id,
  selector: 'show-list',
  templateUrl: 'show-list.component.html',
  directives: [MD_CARD_DIRECTIVES, MdButton]
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
