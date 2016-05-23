import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton, MdAnchor } from '@angular2-material/button';
import { MdIcon } from '@angular2-material/icon';

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
  styleUrls: ['show-list.component.css'],
  directives: [MD_CARD_DIRECTIVES, MdButton, MdIcon, MdAnchor]
})
export class ShowListComponent {
  @Input() shows: Array<ShowListItem>;
  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();
  @Output() unComplete = new EventEmitter();

  isWatched(show: ShowListItem) {
    if (!show.todo.watchedEpisode) return false;

    return show.todo.watchedEpisode[0] >= show.episode.airedSeason
      && show.todo.watchedEpisode[1] >= show.episode.airedEpisodeNumber;
  }
}
