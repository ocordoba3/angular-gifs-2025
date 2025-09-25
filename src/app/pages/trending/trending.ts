import { Component, inject, effect } from '@angular/core';
import { GiphyService } from '@app/services/giphy-service';
import { GifList } from '@app/shared/gif-list/gif-list';

@Component({
  selector: 'app-trending',
  imports: [GifList],
  templateUrl: './trending.html',
  styleUrl: './trending.scss',
})
export default class Trending {
  giphyService = inject(GiphyService);

  constructor() {
    this.giphyService.getTrending();
  }
}
