import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon } from '@angular2-material/icon';
import { MATERIAL_DIRECTIVES } from 'ng2-material';
import * as moment from 'moment';

import { ShowListItem } from './interfaces';

@Component({
  moduleId: module.id,
  selector: 'show-list',
  templateUrl: 'show-list.component.html',
  styleUrls: ['show-list.component.css'],
  directives: [MD_CARD_DIRECTIVES, MATERIAL_DIRECTIVES, MdIcon]
})
export class ShowListComponent {
  moment = moment;
  displaySeason: boolean = true;
  @Input() shows: Array<ShowListItem>;
  @Input() isWatched: Function;

  @Output() remove = new EventEmitter();
  @Output() complete = new EventEmitter();
  @Output() unComplete = new EventEmitter();

  nextEpisodeTime(show: ShowListItem) {
    const diff = this.moment(show.episode.nextEpisode.firstAired).diff(moment(), 'days');
    return {
      time: diff > 0 ? `in ${diff} days, ` : `is today at ${show.detail.airsTime}`,
      date: diff > 0 ?
        'on ' + moment(show.episode.nextEpisode.firstAired).format('dddd, MMM DD') : ''
    };
  }
}
